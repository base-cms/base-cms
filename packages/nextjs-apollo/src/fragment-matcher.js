import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '@base-cms/graphql-stitching/fragment-types.json';

// const { IntrospectionFragmentMatcher } = apolloCache;

export default new IntrospectionFragmentMatcher({ introspectionQueryResultData });
