import getConfig from 'next/config';

export default () => {
  // Load the canonical path fields.
  const { publicRuntimeConfig } = getConfig();
  const { contentCanonicalPathFields } = publicRuntimeConfig;
  return contentCanonicalPathFields;
};
