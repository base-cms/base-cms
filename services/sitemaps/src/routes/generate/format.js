const moment = require('moment');
const { BASE_URI } = require('../../env');

const formatDate = v => moment(v).format();

const formatIndex = (files = []) => `<?xml version="1.0" encoding="utf-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${files.map(({ filename, lastmod }) => `<sitemap>
    <loc>${BASE_URI}${filename}</loc>
    <lastmod>${formatDate(lastmod)}</lastmod>
  </sitemap>`)}
</sitemapindex>`;

const formatContent = (docs = []) => `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${docs.map(({ _id, updated }) => `<url>
    <loc>${BASE_URI}/${_id}</loc>
    <lastmod>${formatDate(updated)}</lastmod>
    <priority>0.5</priority>
    <changefreq>weekly</changefreq>
  </url>`)}
</urlset>`;

const formatSections = (sections = []) => `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${sections.map(({ alias }) => `<url>
    <loc>${BASE_URI}/${alias}</loc>
    <lastmod>${formatDate(new Date())}</lastmod>
    <priority>0.7</priority>
    <changefreq>daily</changefreq>
  </url>`)}
</urlset>`;

module.exports = {
  formatContent,
  formatIndex,
  formatSections,
};
