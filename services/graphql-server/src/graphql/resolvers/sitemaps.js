const fetch = require('node-fetch');
const { SITEMAP_SERVICE_URI } = require('../../env');

const generate = async (type, baseUri, canonicalRules) => {
  const url = `${SITEMAP_SERVICE_URI}/generate`;
  const fetchOpts = {
    method: 'post',
    body: JSON.stringify({ type, baseUri, canonicalRules }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return fetch(url, fetchOpts);
};

module.exports = {
  /**
   *
   */
  Mutation: {
    /**
     *
     */
    generateSitemaps: (_, { input: { type, baseUri } }, { canonicalRules }) => generate(
      type,
      baseUri,
      canonicalRules,
    ),
  },
};
