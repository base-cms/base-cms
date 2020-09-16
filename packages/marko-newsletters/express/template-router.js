const { Router } = require('express');
const { asyncRoute } = require('@base-cms/utils');
const buildMarkoGlobal = require('@base-cms/marko-core/utils/build-marko-global');
const cleanChunk = require('@base-cms/marko-core/utils/clean-marko-chunk');
const gql = require('graphql-tag');
const createError = require('http-errors');
const moment = require('moment-timezone');
const pretty = require('pretty');
const cleanResponse = require('@base-cms/marko-core/middleware/clean-marko-response');
const siteContextFragment = require('@base-cms/web-common/graphql/website-context-fragment');
const websiteFactory = require('../utils/website-factory');

const query = gql`

query WithMarkoNewsletter($input: EmailNewsletterAliasQueryInput!) {
  emailNewsletterAlias(input: $input) {
    id
    name
    teaser
    alias
    description
    status
    site {
      ...MarkoWebsiteContextFragment
    }
    alphaThemeConfigs {
      edges {
        node {
          id
          status
          accentFontColor
          headerLink
          socialIcons
          facebook
          linkedin
          twitter
          youtube
          instagram
          pinterest
          headerBgColor
          headerTextColor
          headerTemplate
          dateToggle
          footerColor
          footerTextColor
          manageSubscriptions
          contactUs
          advertise
          headerLeft {
            id
            src
          }
          headerRight {
            id
            src
          }
        }
      }
    }
  }
}

${siteContextFragment}

`;

module.exports = ({ templates }) => {
  const router = Router();

  router.use(cleanResponse());

  templates.forEach(({ route, template, alias }) => {
    router.get(route, asyncRoute(async (req, res) => {
      const { apollo } = res.locals;
      const input = { alias, status: 'any' };

      const { data } = await apollo.query({ query, variables: { input } });
      const { emailNewsletterAlias: newsletter } = data;

      // Load the current newsletter and associated website.
      if (newsletter && newsletter.status !== 1) throw createError(404, `No newsletter found for '${alias}'`);

      let timezone = 'America/Chicago';
      if (newsletter) {
        // Only handle site context when a newsletter is present.
        // This ensures that static templates can still route.
        const { site } = newsletter;
        if (!site) throw createError(500, `No newsletter site object was found for '${alias}'`);
        const website = websiteFactory(site);

        // Set website context.
        res.locals.website = website;
        res.setHeader('x-site', `${website.get('name')} [${website.get('id')}]`);
        // Set marko core date config.
        res.locals.markoCoreDate = {
          timezone: website.get('date.timezone'),
          locale: website.get('date.locale'),
          format: website.get('date.format'),
        };

        // Set timezone from site context.
        timezone = website.get('date.timezone');
      }

      const ts = req.query.date ? parseInt(req.query.date, 10) : null;
      let date = moment().tz(timezone);
      if (ts) {
        date = moment(ts).tz(timezone);
      } else if (req.query.date) {
        date = moment(req.query.date).tz(timezone);
      }
      if (!date.isValid()) throw createError(400, 'The provided date parameter is invalid.');

      const templateData = {
        date,
        dateInfo: {
          dayofweek: date.isoWeekday(),
          weeknum: date.isoWeek(),
          month: date.month() + 1,
          day: date.date(),
          year: date.year(),
        },
        newsletter: newsletter || {},
        isStatic: !newsletter,
      };

      const prettyOutput = process.env.MARKO_NEWSLETTERS_PRETTY || Object.hasOwnProperty.call(req.query, 'pretty');
      if (prettyOutput) {
        const $global = buildMarkoGlobal(res);
        const out = template.createOut();
        template.render({ $global, ...templateData }, out);
        out.on('finish', () => {
          const html = cleanChunk(out.getOutput());
          res.send(pretty(html));
        });
        out.end();
      } else {
        res.marko(template, templateData);
      }
    }));
  });
  return router;
};
