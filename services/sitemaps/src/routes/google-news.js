const { getLatestNews } = require('../db/base');
const { formatNews: formatter } = require('./generate/format');

/**
 * Returns up to 1000 News, PressRelease, or Blog content published in the last 5 days.
 * https://support.google.com/news/publisher-center/answer/74288?hl=en
 */
module.exports = async (res) => {
  const news = await getLatestNews();
  res.setHeader('X-Robots-Tag', 'noindex');
  res.setHeader('Content-Type', 'text/xml');
  res.end(formatter(news));
};
