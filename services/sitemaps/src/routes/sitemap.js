const { asyncRoute } = require('@base-cms/utils');
const { getContentCounts, getSuffixes } = require('../util');

const formatter = (files = []) => `<?xml version="1.0" encoding="utf-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${files.reduce((str, { url }) => `${str}  <sitemap>
    <loc>${url}</loc>
  </sitemap>\n`, '')}
</sitemapindex>`;

module.exports = asyncRoute(async (req, res) => {
  const { baseUri } = res.locals;

  try {
    const cursor = await getContentCounts();
    const typeCounts = await cursor.toArray();
    const sections = [{ url: `${baseUri}/sitemap/sections.xml` }];
    const toFormat = sections.concat(typeCounts.reduce((arr, { _id, count }) => arr
      .concat(getSuffixes(count).map(suffix => ({
        url: `${baseUri}/sitemap/${_id}${suffix}.xml`,
      }))), []));
    res.end(formatter(toFormat));
  } catch (e) {
    res.status(500).send();
  }
});
