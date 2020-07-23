const algoliasearch = require('algoliasearch');
const gql = require('graphql-tag');
const apollo = require('../graphql/query');
const { buildSections, boostResult } = require('./helpers');
const { ALGOLIA_APPID, ALGOLIA_API_KEY } = require('../../env');

const { log } = console;

const client = algoliasearch(ALGOLIA_APPID, ALGOLIA_API_KEY);

const query = message => (gql`
  query {
      content(input:{ id: ${message.id}, status: any }) {
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
  log(`Proccessing: ${message.id}`);
  const c = await apollo.queryFromBase(query(message), message.tenant);
  try {
    if (c.websiteSchedules) {
      c.set(await buildSections(c));
    }

    c.boost = await boostResult(c);

    const index = client.initIndex(message.tenant);
    index.saveObject({
      objectID: c.content.id,
      ...c.content,
    });
  } catch (e) {
    throw (`Failed on: ${message.id}`, e);
  }
};

module.exports = { upsertToIndex };
