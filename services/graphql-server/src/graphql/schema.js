const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');
const schemaDirectives = require('./directives');
const typeDefs = require('./definitions');

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives,
});
