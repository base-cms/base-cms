import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '@base-cms/graphql-fragment-types';

export default new IntrospectionFragmentMatcher({ introspectionQueryResultData });
