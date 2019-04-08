const moment = require('moment');
const {
  content: canonicalPathFor,
  requestParser,
} = require('@base-cms/canonical-path');
const { getLatestNews } = require('../db/base');
const { GOOGLE_NEWS_PUBLICATION } = require('../env');

const formatter = (docs = []) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${docs.reduce((str, doc) => `${str}  <url>
    <loc>${doc.canonicalPath}</loc>
    <news:news>
      <news:publication>
        <news:name>${GOOGLE_NEWS_PUBLICATION}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:genres>${doc.type}</news:genres>
      <news:publication_date>${moment(doc.published).format()}</news:publication_date>
      <news:title>${doc.name.replace(/&/g, '&amp;')}</news:title>
    </news:news>
  </url>\n`, '')}
</urlset>`;

/**
 * Returns up to 1000 News, PressRelease, or Blog content published in the last 5 days.
 * https://support.google.com/news/publisher-center/answer/74288?hl=en
 */
module.exports = async (req, res) => {
  const { host } = req.headers;
  const baseUri = `http://${host}`;
  const canonicalRules = requestParser(req);
  const news = await getLatestNews();
  res.setHeader('X-Robots-Tag', 'noindex');
  res.setHeader('Content-Type', 'text/xml');
  const toFormat = await Promise.all(news.map(async (content) => {
    const path = await canonicalPathFor(content, { canonicalRules });
    const canonicalPath = `${baseUri}${path}`;
    return { ...content, canonicalPath };
  }));
  console.log(toFormat);
  res.end(formatter(toFormat));
};
