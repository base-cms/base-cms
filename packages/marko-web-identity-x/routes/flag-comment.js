const gql = require('graphql-tag');
const { asyncRoute } = require('@base-cms/utils');

const mutation = gql`
  mutation FlagComment($id: String!) {
    setCommentFlagged(input: { id: $id, value: true }) {
      id
      flagged
    }
  }
`;

module.exports = asyncRoute(async (req, res) => {
  const { identityX } = req;
  const { id } = req.params;
  const variables = { id };
  await identityX.client.mutate({ mutation, variables });
  res.json({ ok: true });
});
