const { asyncRoute } = require('@base-cms/utils');
const gql = require('graphql-tag');
const { PAGE_SIZE } = require('../env');

const query = gql`

query PublishedContentCounts($input: PublishedContentCountsQueryInput) {
  publishedContentCounts(input: $input) {
    id
    type(input: { format: standard })
    count
  }
}

`;

/**
 * Returns an array of file suffixes based on counts e.g;
 * count=    1 = ['']
 * count=10000 = ['']
 * count=10001 = ['', '.1']
 * count=20000 = ['', '.1']
 * count=20001 = ['', '.1', '.2']
 *
 * @param {*} count
 * @param {*} limit
 */
const getSuffixes = (count, limit = PAGE_SIZE) => {
  const num = count % limit === 0
    ? count / limit
    : ((count - (count % limit)) / limit) + 1;
  return [...Array(num).keys()].map(x => (x === 0 ? '' : `.${x}`));
};

const sitemapUrl = (origin, type, suffix) => `${origin}/sitemap/${type}${suffix}.xml`;
const createSitemap = (origin, type, suffix) => `<sitemap><loc>${sitemapUrl(origin, type, suffix)}</loc></sitemap>`;
const createIndex = maps => `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd">${maps.join('')}</sitemapindex>`;

module.exports = asyncRoute(async (req, res) => {
  const { apollo, websiteContext } = res.locals;
  const { origin } = websiteContext;
  const input = { excludeContentTypes: ['Promotion', 'TextAd'] };

  const { data } = await apollo.query({ query, variables: { input } });
  const { publishedContentCounts } = data;

  const sitemaps = publishedContentCounts.reduce((arr, { type, count }) => {
    const suffixes = getSuffixes(count);
    const contentSitemaps = suffixes.map(suffix => createSitemap(origin, type, suffix));
    arr.push(...contentSitemaps);
    return arr;
  }, [createSitemap(origin, 'sections', [''])]);

  res.end(`<?xml version="1.0" encoding="utf-8"?>${createIndex(sitemaps)}`);
});
