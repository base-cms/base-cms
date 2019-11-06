const { IntrospectionFragmentMatcher } = require('apollo-cache-inmemory');
const introspectionQueryResultData = require('./index');

module.exports = new IntrospectionFragmentMatcher({ introspectionQueryResultData });
