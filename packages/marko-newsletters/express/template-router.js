const { Router } = require('express');
const { asyncRoute } = require('@base-cms/utils');
const gql = require('graphql-tag');
const createError = require('http-errors');
const moment = require('moment-timezone');
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

      res.marko(template, {
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
      });
    }));
  });
  return router;
};
