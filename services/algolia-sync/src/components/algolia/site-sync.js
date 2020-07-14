const gql = require('graphql-tag');
const algoliasearch = require('algoliasearch');
const cliProgress = require('cli-progress');
const apollo = require('../graphql/query');
const helpers = require('./helpers');
require('dotenv').config();

const client = algoliasearch(process.env.ALGOLIA_APPID, process.env.ALGOLIA_API_KEY);

const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

const query = gql`
  query websiteScheduledContent($input: AllPublishedContentQueryInput!) {
    allPublishedContent(input: $input){
      pageInfo {
        hasNextPage
      }
      edges {
        node {
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
        }
      }
    }
  }
`;

const total = () => (gql`
  query websiteScheduledContent($input: AllPublishedContentQueryInput!) {
    allPublishedContent(input: $input){
      totalCount
    }
  }
`);

const upsertToIndex = async (tenant, limit, skip, totalContent) => {
  bar.update(skip);

  const input = {
    pagination: {
      limit,
      skip,
    },
  };

  const data = await apollo.queryFromBase(query, tenant, input);
  const nodes = data.allPublishedContent.edges.map(content => content.node);
  const algoliaData = await helpers.buildObj(nodes, tenant);
  await client.multipleBatch(algoliaData, (err) => { if (err) throw err; });

  if (skip < totalContent) {
    upsertToIndex(tenant, limit, (skip + limit), totalContent);
  } else {
    bar.stop();
  }
};

const setup = async (tenant, limit, skip) => {
  if (typeof tenant === 'undefined') throw new Error('Please pass a tenant');
  const input = {
    pagination: {
      skip,
    },
  };

  const count = await apollo.queryFromBase(total(), tenant, input);
  const totalContent = count.allPublishedContent.totalCount;
  bar.start(totalContent, skip);
  await upsertToIndex(tenant, limit, skip, totalContent);
};

module.exports = { setup };
