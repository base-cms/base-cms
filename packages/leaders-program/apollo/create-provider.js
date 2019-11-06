import VueApollo from 'vue-apollo';
import createApolloClient from './create-client';

export default ({
  graphqlUri,
  tenantKey,
  siteId,
  baseApiUri,
} = {}) => {
  const apiUri = baseApiUri || window.location.origin;
  if (!graphqlUri || !tenantKey || !apiUri) {
    throw new Error('The graphqlUri, tenantKey, and baseApiUri options are required to create the BaseCMS Apollo Provider.');
  }
  const headers = {
    'x-tenant-key': tenantKey,
    'x-base4-api-uri': apiUri,
  };
  if (siteId) headers['x-site-id'] = siteId;
  return new VueApollo({
    defaultClient: createApolloClient({ uri: graphqlUri, headers }),
  });
};
