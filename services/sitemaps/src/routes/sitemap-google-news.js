const { asyncRoute } = require('@base-cms/utils');
const { BaseDB } = require('@base-cms/db');
const moment = require('moment');
const {
  content: canonicalPathFor,
  requestParser: getCanonicalRules,
} = require('@base-cms/canonical-path');

const { getLatestNews, getPrimarySectionLoader } = require('../util');

const formatter = (docs = [], publication) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${docs.reduce((str, doc) => `${str}  <url>
    <loc>${doc.url}</loc>
    <news:news>
      <news:publication>
        <news:name>${publication}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:genres>${doc.type}</news:genres>
      <news:publication_date>${moment(doc.published).format()}</news:publication_date>
      <news:title>${doc.name.replace(/&/g, '&amp;')}</news:title>
    </news:news>
  </url>\n`, '')}
</urlset>`;

module.exports = asyncRoute(async (req, res) => {
  const publication = req.headers['x-publication-name'] || 'Google News Publisher';
  const baseUri = `${req.protocol}://${req.get('host')}`;
  const canonicalRules = getCanonicalRules(req);
  res.setHeader('X-Robots-Tag', 'noindex');
  res.setHeader('Content-Type', 'text/xml');

  try {
    const news = await getLatestNews();

    // Get sections to run a single query
    const sectionIds = [...new Set(news.map((content) => {
      const ref = BaseDB.get(content, 'mutations.Website.primarySection');
      return BaseDB.extractRefId(ref);
    }))];

    // Inject a loader function into the context
    const load = await getPrimarySectionLoader(sectionIds);
    const context = { canonicalRules, load };

    const toFormat = await Promise.all(news.map(async (content) => {
      const slug = BaseDB.get(content, 'mutations.Website.slug');
      const path = await canonicalPathFor({ slug, ...content }, context);
      const url = `${baseUri}${path}`;
      return { ...content, url };
    }));
    res.end(formatter(toFormat, publication));
  } catch (e) {
    res.status(500).send();
  }
});
