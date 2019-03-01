const { IntrospectionFragmentMatcher } = require('apollo-cache-inmemory');
const introspectionQueryResultData = require('@base-cms/graphql-fragment-types');

module.exports = new IntrospectionFragmentMatcher({ introspectionQueryResultData });
