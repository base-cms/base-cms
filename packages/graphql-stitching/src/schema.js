const { makeRemoteExecutableSchema, introspectSchema, mergeSchemas } = require('graphql-tools');
const link = require('./link');

let promise;
module.exports = async () => {
  const build = async () => {
    const schema = await introspectSchema(link);
    const executableSchema = makeRemoteExecutableSchema({
      schema,
      link,
    });
    // Use `mergeSchemas` to avoid needing the `__typename` field included.
    // @see https://github.com/apollographql/graphql-tools/issues/441#issuecomment-345423403
    return mergeSchemas({ schemas: [executableSchema] });
  };
  if (!promise) {
    // This will cache the schema and would require a reload of the app if it changes.
    promise = build();
  }
  return promise;
};
