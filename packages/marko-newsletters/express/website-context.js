const { asyncRoute } = require('@base-cms/utils');
const gql = require('graphql-tag');

const query = gql`

query WebsiteContext {
  websiteContext {
    id
    name
    description
    host
    origin
    language {
      code
      primaryCode
      subCode
    }
  }
}

`;

module.exports = coreConfig => asyncRoute(async (req, res, next) => {
  const { apollo } = res.locals;
  const { data } = await apollo.query({ query });
  coreConfig.setWebsiteContext(data.websiteContext);
  next();
});
