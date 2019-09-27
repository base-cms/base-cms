const { asyncRoute } = require('@base-cms/utils');
const gql = require('graphql-tag');

const query = gql`

query WebsiteContext {
  websiteContext {
    id
    name
    host
    origin
    language {
      primaryCode
    }
  }
}

`;

module.exports = () => asyncRoute(async (req, res, next) => {
  const { apollo } = res.locals;
  const { data } = await apollo.query({ query });
  res.locals.websiteContext = data.websiteContext;
  next();
});
