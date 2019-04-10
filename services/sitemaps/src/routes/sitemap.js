const { asyncRoute } = require('@base-cms/utils');
const moment = require('moment');

const { getContentCounts, getSuffixes } = require('../util');

const formatter = (files = []) => `<?xml version="1.0" encoding="utf-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${files.reduce((str, { url, date }) => `${str}  <sitemap>
    <loc>${url}</loc>
    <lastmod>${moment(date).format()}</lastmod>
  </sitemap>\n`, '')}
</sitemapindex>`;

const handle = asyncRoute(async (req, res) => {
  const baseUri = `${req.protocol}://${req.get('host')}`;
  res.setHeader('X-Robots-Tag', 'noindex');
  res.setHeader('Content-Type', 'text/xml');

  try {
    // @todo get the updated date for the last item of each index
    const lastmod = moment().format();
    const cursor = await getContentCounts();
    const typeCounts = await cursor.toArray();
    const sections = [{ url: `${baseUri}/sitemap/sections.xml`, lastmod }];
    const toFormat = sections.concat(typeCounts.reduce((arr, { _id, count }) => arr
      .concat(getSuffixes(count).map(suffix => ({
        url: `${baseUri}/sitemap/${_id}${suffix}.xml`,
        date: lastmod,
      }))), []));
    res.end(formatter(toFormat));
  } catch (e) {
    res.status(500).send();
  }
});


module.exports = (app) => {
  const path = '([a-z0-9-/]*)?/sitemap.xml';
  app.get(path, handle);
  app.head(path, handle);
};
