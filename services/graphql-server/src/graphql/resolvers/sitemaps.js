const fetch = require('node-fetch');
const { SITEMAP_SERVICE_URI } = require('../../env');

const { error } = console;

const generate = async (type, baseUri, canonicalRules) => {
  try {
    const url = `${SITEMAP_SERVICE_URI}/generate`;
    const fetchOpts = {
      method: 'post',
      body: JSON.stringify({ type, baseUri, canonicalRules }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(url, fetchOpts);
    return res.ok;
  } catch (e) {
    error(e);
    return false;
  }
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
