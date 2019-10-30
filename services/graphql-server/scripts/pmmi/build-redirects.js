const { content: canonicalPathFor, requestParser: getCanonicalRules } = require('@base-cms/canonical-path');
const { BaseDB } = require('@base-cms/db');
const { get } = require('@base-cms/object-path');
const createDB = require('../../src/basedb');

const cleanPath = (value) => {
  if (!value) return '';
  const v = value.trim();
  if (!v) return v;
  if (/^http/.test(v)) return v;
  return `/${v.replace(/^\/+/, '')}`;
};

const { log } = console;
const { TENANT_KEY } = process.env;
const basedb = createDB(TENANT_KEY);

const canonicalRules = getCanonicalRules({ headers: {} });

const iterateCursor = async (cursor, cb) => {
  if (await cursor.hasNext()) {
    const doc = await cursor.next();
    await cb(doc);
    await iterateCursor(cursor, cb);
  }
};

const getPrimarySectionLoader = async (ids) => {
  const query = {
    _id: { $in: ids },
    status: 1,
  };
  const options = {
    projection: { alias: 1 },
  };
  const sections = await basedb.find('website.Section', query, options);
  const sectionMap = sections.reduce((map, section) => map.set(`${section._id}`, section), new Map());
  return (_, id) => sectionMap.get(`${id}`);
};

const buildContentRedirects = async (contentColl, key) => {
  log('Retrieving content redirects...');
  const sectionIds = await contentColl.distinct('mutations.Website.primarySection.$id', {
    'legacy.source': { $in: [key, `${key}_node`] },
    'mutations.Website.redirects.0': { $exists: true },
    // 'mutations.Website.primarySite': { $ne: new ObjectID('5d76bfaf665fc42e008b4569') },
  });
  log('Getting primarySection references...');

  const load = await getPrimarySectionLoader(sectionIds);
  log('Primary section references loaded.');

  const context = { canonicalRules, load };

  const cursor = await contentColl.aggregate([
    {
      $match: {
        'legacy.source': { $in: [key, `${key}_node`] },
        'mutations.Website.redirects.0': { $exists: true },
      },
    },
    {
      $project: {
        type: 1,
        'mutations.Website.redirects': 1,
        'mutations.Website.slug': 1,
        'mutations.Website.primarySection': 1,
        'mutations.Website.primarySite': 1,
      },
    },
    { $unwind: '$mutations.Website.redirects' },
    {
      $project: {
        type: 1,
        'mutations.Website.redirects': 1,
        'mutations.Website.slug': 1,
        'mutations.Website.primarySection': 1,
        'mutations.Website.primarySite': 1,
      },
    },
  ]);

  const results = [];
  await iterateCursor(cursor, async (doc) => {
    if (typeof doc === 'object') {
      const redirect = get(doc, 'mutations.Website.redirects');
      const primarySite = get(doc, 'mutations.Website.primarySite');
      const siteCtx = { id: () => primarySite };
      const from = cleanPath(redirect);
      const slug = BaseDB.get(doc, 'mutations.Website.slug');
      const path = await canonicalPathFor({ slug, ...doc }, { ...context, site: siteCtx });
      results.push({ siteId: primarySite, from, to: path });
    }
  });

  log(`Found ${results.length} content redirects.`);

  return results;
};

const run = async () => {
  const client = await basedb.client.connect();
  log(`BaseCMS DB connected to ${client.s.url} for ${basedb.tenant}`);

  const [redirectsColl, contentColl] = await Promise.all([
    basedb.collection('website', 'Redirects'),
    basedb.collection('platform', 'Content'),
    basedb.collection('website', 'Section'),
    basedb.collection('magazine', 'Issue'),
    basedb.collection('platform', 'Product'),
  ]);

  const promised = await Promise.all([
    // buildContentRedirects(contentColl, 'oem'),
    // buildContentRedirects(contentColl, 'pfw'),
    // buildContentRedirects(contentColl, 'hp'),
    buildContentRedirects(contentColl, 'aw'),
    buildContentRedirects(contentColl, 'pw'),
    // buildContentRedirects(contentColl, 'sc'),
    // buildContentRedirects(contentColl, 'lsl'),
    // buildSectionRedirects(sectionColl),
    // buildIssueRedirects(issueColl),
    // buildGlobalRedirects(),
    // buildWebsiteProductRedirects(productColl),
  ]);

  const redirects = promised
    .reduce((arr, el) => arr.concat(el), [])
    .map(({ siteId, from, to }) => ({ siteId, from: cleanPath(from), to: cleanPath(to) }))
    .filter(({ siteId, from, to }) => siteId && from && to);

  log('Beginning bulk write process...');

  const bulkOps = redirects.map(({ siteId, from, to }) => ({
    updateOne: {
      filter: { siteId, from },
      update: { $set: { siteId, from, to } },
      upsert: true,
    },
  }));

  const { matchedCount } = await redirectsColl.bulkWrite(bulkOps);
  log('Bulk write complete.', matchedCount);

  await basedb.close();
};

run().catch(e => setImmediate(() => { throw e; }));
