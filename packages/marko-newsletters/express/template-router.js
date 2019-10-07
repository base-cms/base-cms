const { Router } = require('express');
const { asyncRoute } = require('@base-cms/utils');
const gql = require('graphql-tag');
const createError = require('http-errors');
const moment = require('moment-timezone');
const cleanResponse = require('@base-cms/marko-core/middleware/clean-marko-response');

const query = gql`

query WithMarkoNewsletter($input: EmailNewsletterAliasQueryInput!) {
  emailNewsletterAlias(input: $input) {
    id
    name
    teaser
    alias
    description
    status
  }
}

`;

module.exports = ({ templates }) => {
  const router = Router();

  router.use(cleanResponse());

  templates.forEach(({ route, template, alias }) => {
    router.get(route, asyncRoute(async (req, res) => {
      const { config } = req.app.locals;
      const timezone = config.website('date.timezone');
      const ts = req.query.date ? parseInt(req.query.date, 10) : null;

      let date = moment().tz(timezone);
      if (ts) {
        date = moment(ts).tz(timezone);
      } else if (req.query.date) {
        date = moment(req.query.date).tz(timezone);
      }
      if (!date.isValid()) throw createError(400, 'The provided date parameter is invalid.');

      const { apollo } = res.locals;
      const input = { alias, status: 'any' };

      const { data } = await apollo.query({ query, variables: { input } });
      const { emailNewsletterAlias: newsletter } = data;

      if (newsletter && newsletter.status !== 1) throw createError(404, 'No newsletter found for the provided alias.');
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
