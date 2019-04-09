const moment = require('moment');
const { content: canonicalPathFor } = require('@base-cms/canonical-path');
const { BaseDB } = require('@base-cms/db');
const { getContent, getContentCounts, getPrimarySections } = require('../../db/base');
const { storeFile } = require('../../db/s3');

const { log } = console;

const formatter = (docs = []) => `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${docs.reduce((str, { url, updated }) => `${str}  <url>
    <loc>${url}</loc>
    <lastmod>${moment(updated).format()}</lastmod>
    <priority>0.5</priority>
    <changefreq>weekly</changefreq>
  </url>\n`, '')}
</urlset>`;

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
const getSuffixes = (count, limit = 10000) => {
  const num = count % limit === 0
    ? count / limit
    : ((count - (count % limit)) / limit) + 1;
  return [...Array(num).keys()].map(x => (x === 0 ? '' : `.${x}`));
};

/**
 * Generates content sitemap for given filename
 */
const generateContent = async ({ filename, baseUri, canonicalRules }) => {
  const regex = /^sitemap\/(?<type>[a-zA-Z]+)\.*(?<suffix>.*).xml$/;
  const { type, suffix } = filename.match(regex).groups;
  const skip = suffix ? parseInt(suffix, 10) * 10000 : 0;
  const docs = await getContent(type, skip);
  log(`    Found ${docs.length} ${type} docs.`);

  // Get sections to run a single query
  const sectionIds = [...new Set(docs.map((content) => {
    const ref = BaseDB.get(content, 'mutations.Website.primarySection');
    return BaseDB.extractRefId(ref);
  }))];
  const sections = await getPrimarySections(sectionIds);
  log(`      Loading ${sectionIds.length} primary sections`);

  // Inject a loader function into the context
  const load = (_, id) => sections.find(s => `${s._id}` === `${id}`);
  const context = { canonicalRules, load };

  const slugged = docs.map(content => ({ ...content, slug: content.mutations.Website.slug }));
  const toFormat = await Promise.all(slugged.map(async (content) => {
    const path = await canonicalPathFor(content, context);
    const url = `${baseUri}${path}`;
    return { ...content, url };
  }));
  return formatter(toFormat);
};


/**
 * Updates content sitemaps
 */
module.exports = async ({ baseUri, canonicalRules }) => {
  log('\n  Getting content counts');
  const cursor = await getContentCounts();
  const typeCounts = await cursor.toArray();
  const filenames = typeCounts.reduce((arr, { _id, count }) => {
    const files = getSuffixes(count).map(suffix => `sitemap/${_id}${suffix}.xml`);
    return arr.concat(files);
  }, []);

  const map = filenames.reduce((obj, filename) => {
    const contents = generateContent({ filename, baseUri, canonicalRules });
    return { ...obj, [filename]: contents };
  }, {});
  log('\n  Generating content sitemaps');
  await Promise.all(Object.keys(map).map(k => map[k]));

  log('\n  Uploading files to S3...');
  return Promise.all(Object.keys(map).map(async (filename) => {
    const contents = await map[filename];
    log(`    Uploading ${filename}...`);
    return storeFile(contents, filename);
  }));
};
