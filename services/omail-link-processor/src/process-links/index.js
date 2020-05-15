const extractUrls = require('./extract-urls');
const contentLinks = require('./content-links');
const emailxAds = require('./emailx-ads');

module.exports = async ({ html, tenantKey, exHost }) => {
  const urls = extractUrls(html);

  const withContentComments = await contentLinks({ html, tenantKey, urls });
  const withAdComments = await emailxAds({ html: withContentComments, urls, exHost });
  return withAdComments;
};
