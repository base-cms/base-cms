const { asyncRoute } = require('@base-cms/utils');
const { BaseDB } = require('@base-cms/db');
const moment = require('moment');
const {
  content: canonicalPathFor,
  requestParser: getCanonicalRules,
} = require('@base-cms/canonical-path');

const { getContent, getPrimarySections } = require('../util');

const formatter = (docs = []) => `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${docs.reduce((str, { url, updated }) => `${str}  <url>
    <loc>${url}</loc>
    <lastmod>${moment(updated).format()}</lastmod>
    <priority>0.5</priority>
    <changefreq>weekly</changefreq>
  </url>\n`, '')}
</urlset>`;

const handle = asyncRoute(async (req, res) => {
  const baseUri = `${req.protocol}://${req.get('host')}`;
  const canonicalRules = getCanonicalRules(req);
  res.setHeader('X-Robots-Tag', 'noindex');
  res.setHeader('Content-Type', 'text/xml');

  try {
    const regex = /sitemap\/(?<type>[a-zA-Z]+)\.*(?<suffix>.*).xml$/;
    const { type, suffix } = req.path.match(regex).groups;
    const skip = suffix ? parseInt(suffix, 10) * 10000 : 0;
    const docs = await getContent(type, skip);

    const sectionIds = [...new Set(docs.map((content) => {
      const ref = BaseDB.get(content, 'mutations.Website.primarySection');
      return BaseDB.extractRefId(ref);
    }))];

    const sections = await getPrimarySections(sectionIds);

    const load = (_, id) => sections.find(s => `${s._id}` === `${id}`);
    const context = { canonicalRules, load };

    const slugged = docs.map(content => ({ ...content, slug: content.mutations.Website.slug }));
    const toFormat = await Promise.all(slugged.map(async (content) => {
      const path = await canonicalPathFor(content, context);
      const url = `${baseUri}${path}`;
      return { ...content, url };
    }));
    res.end(formatter(toFormat));
  } catch (e) {
    res.status(500).send();
  }
});


module.exports = (app) => {
  const path = '([a-z0-9-/]*)?/sitemap/*.xml';
  app.get(path, handle);
  app.head(path, handle);
};
