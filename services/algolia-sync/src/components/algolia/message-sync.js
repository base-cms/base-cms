const algoliasearch = require('algoliasearch');
const gql = require('graphql-tag');
const apollo = require('../graphql/query');
const { buildSections, boostResult } = require('./helpers');
require('dotenv').config();

const client = algoliasearch(process.env.ALGOLIA_APPID, process.env.ALGOLIA_API_KEY);

const query = message => (gql`
  query {
      content(input:{id:${message.id}}) {
        id
        type
        created
        published
        updated
        status
        websiteSchedules { section { hierarchy {fullName} }}
        primaryImage { name filePath fileName src isLogo }
        primarySite{ host }
        name
        teaser
        body
      }
  }
`);

const upsertToIndex = async (message) => {
  const c = await apollo.queryFromBase(query(message), message.tenant);
  if (c.websiteSchedules) {
    c.set(await buildSections(c));
  }

  c.boost = await boostResult(c);

  const index = client.initIndex(message.tenant);
  index.saveObject({
    objectID: c.content.id,
    ...c.content,
  });
};

module.exports = { upsertToIndex };
