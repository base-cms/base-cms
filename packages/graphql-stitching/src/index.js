const { makeRemoteExecutableSchema, introspectSchema, mergeSchemas } = require('graphql-tools');
const createLink = require('./link');
const createClient = require('./client');

const build = async ({ uri, contentCanonicalPaths }) => {
  const link = createLink({ uri, contentCanonicalPaths });
  const schema = await introspectSchema(link);
  const executableSchema = makeRemoteExecutableSchema({
    schema,
    link,
  });
  // Use `mergeSchemas` to avoid needing the `__typename` field included.
  // @see https://github.com/apollographql/graphql-tools/issues/441#issuecomment-345423403
  return {
    link,
    client: createClient(link),
    schema: mergeSchemas({ schemas: [executableSchema] }),
  };
};

let promise;
module.exports = async ({ uri, contentCanonicalPaths }) => {
  if (!promise) {
    // This will cache the schema and would require a reload of the app if it changes.
    promise = build({ uri, contentCanonicalPaths });
  }
  return promise;
};
