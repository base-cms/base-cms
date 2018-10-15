import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '@base-cms/base4-graphql-stitching/fragment-types.json';

// const { IntrospectionFragmentMatcher } = apolloCache;

export default new IntrospectionFragmentMatcher({ introspectionQueryResultData });
