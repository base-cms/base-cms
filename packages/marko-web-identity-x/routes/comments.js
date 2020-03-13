const gql = require('graphql-tag');
const { asyncRoute } = require('@base-cms/utils');

const query = gql`
  query ListComments($input: CommentsForStreamQueryInput!) {
    commentsForStream(input: $input) {
      totalCount
      stream {
        id
        archived
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          body
          approved
          flagged
          createdAt
          user {
            id
            displayName
          }
        }
      }
    }
  }
`;

module.exports = asyncRoute(async (req, res) => {
  const { identifier } = req.params;
  const { after } = req.query;
  const { identityX } = req;
  const limit = after ? 20 : 5;
  const pagination = { limit, after };
  const variables = { input: { identifier, pagination } };
  const { data } = await identityX.client.query({ query, variables });
  res.json(data.commentsForStream);
});
