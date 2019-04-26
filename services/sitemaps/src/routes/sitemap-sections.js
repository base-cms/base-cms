const { websiteSection: canonicalPathFor, requestParser: getCanonicalRules } = require('@base-cms/canonical-path');
const { asyncRoute } = require('@base-cms/utils');
const moment = require('moment');

const { getSections } = require('../util');

const formatter = (sections = []) => `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sections.reduce((str, { url }) => `${str}  <url>
    <loc>${url}</loc>
    <lastmod>${moment().format()}</lastmod>
    <priority>0.7</priority>
    <changefreq>daily</changefreq>
  </url>\n`, '')}
</urlset>`;

module.exports = asyncRoute(async (req, res) => {
  const { baseUri, basedb } = res.locals;
  const canonicalRules = getCanonicalRules(req);

  try {
    const sections = await getSections(basedb);
    const updated = new Date();
    const toFormat = await Promise.all(sections.map(async (section) => {
      const alias = await canonicalPathFor(section, { canonicalRules });
      const url = `${baseUri}${alias}`;
      return { updated, url };
    }));
    res.end(formatter(toFormat));
  } catch (e) {
    res.status(500).send();
  }
});
