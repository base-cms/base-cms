const gql = require('graphql-tag');
const { asyncRoute } = require('@base-cms/utils');

const query = gql`
  query ListComments($input: CommentsForStreamQueryInput!) {
    commentsForStream(input: $input) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          body
          approved
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
  const { identityX } = req;
  const variables = { input: { identifier } };
  const { data } = await identityX.client.query({ query, variables });
  res.json(data.commentsForStream);
});
