const { makeRemoteExecutableSchema, introspectSchema } = require('graphql-tools');
const link = require('./link');

let promise;
module.exports = async () => {
  const build = async () => {
    const schema = await introspectSchema(link);
    return makeRemoteExecutableSchema({
      schema,
      link,
    });
  };
  if (!promise) {
    // This will cache the schema and would require a reload of the app if it changes.
    promise = build();
  }
  return promise;
};
