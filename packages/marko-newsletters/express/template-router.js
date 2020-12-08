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
const { extractFragmentData } = require('@base-cms/web-common/utils');
const { getAsObject } = require('@base-cms/object-path');
const websiteFactory = require('../utils/website-factory');

const buildQuery = ({ queryFragment }) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData(queryFragment);
  return gql`
    query WithMarkoNewsletter($input: EmailNewsletterAliasQueryInput!, $campaignsBefore: Date) {
      emailNewsletterAlias(input: $input) {
        id
        name
        teaser
        alias
        description
        status
        campaigns(input: { scheduledBefore: $campaignsBefore, pagination: { limit: 1 } }) {
          edges {
            node {
              id
              name
              deploymentDate
            }
          }
        }
        site {
          ...MarkoWebsiteContextFragment
        }
        ${spreadFragmentName}
      }
    }

    ${siteContextFragment}
    ${processedFragment}
  `;
};

module.exports = ({ templates }) => {
  const router = Router();

  router.use(cleanResponse());

  templates.forEach(({
    route,
    template,
    alias,
    queryFragment,
  }) => {
    router.get(route, asyncRoute(async (req, res) => {
      const { apollo } = res.locals;
      const input = { alias, status: 'any' };

      const { data } = await apollo.query({
        query: buildQuery({ queryFragment }),
        variables: { input, campaignsBefore: Date.now() },
      });
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

      // Set initial date of now
      let date = moment().tz(timezone);
      // Attempt to parse a timestamp from query string
      const ts = req.query.date ? parseInt(req.query.date, 10) : null;

      // Get the latest campaign.
      const latestCampaign = getAsObject(newsletter, 'campaigns.edges.0.node');
      if (req.query.date === 'latest-campaign' && latestCampaign.deploymentDate) {
        // use latest campaign date
        date = moment(latestCampaign.deploymentDate).tz(timezone);
      } else if (ts) {
        // use timestamp from query string
        date = moment(ts).tz(timezone);
      } else if (req.query.date) {
        // attempt to parse the query string directly.
        date = moment(req.query.date).tz(timezone);
      }
      if (!date.isValid()) throw createError(400, 'The provided date parameter is invalid.');

      // finally, ensure the date is always the beginning of the day
      date = moment(date).startOf('day');

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
