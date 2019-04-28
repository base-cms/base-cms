const { content: canonicalPathFor, requestParser: getCanonicalRules } = require('@base-cms/canonical-path');
const { BaseDB } = require('@base-cms/db');
const createDB = require('./src/basedb');

const { log } = console;
const { TENANT_KEY } = process.env;
const basedb = createDB(TENANT_KEY);

const canonicalRules = getCanonicalRules({ headers: {} });

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

const run = async () => {
  const client = await basedb.client.connect();
  log(`BaseCMS DB connected to ${client.s.url} for ${basedb.tenant}`);

  const [redirectsColl, contentColl] = await Promise.all([
    basedb.collection('website', 'Redirects'),
    basedb.collection('platform', 'Content'),
  ]);


  log('Retrieving content redirects...');
  const cursor = await contentColl.aggregate([
    { $match: { 'mutations.Website.redirects.0': { $exists: true } } },
    { $unwind: '$mutations.Website.redirects' },
    {
      $project: {
        type: 1,
        'mutations.Website.redirects': 1,
        'mutations.Website.slug': 1,
        'mutations.Website.primarySection': 1,
      },
    },
  ]);
  const docs = await cursor.toArray();

  log('Getting primarySection references...');
  const sectionIds = [...new Set(docs.map((content) => {
    const ref = BaseDB.get(content, 'mutations.Website.primarySection');
    return BaseDB.extractRefId(ref);
  }))];

  const load = await getPrimarySectionLoader(sectionIds);
  const context = { canonicalRules, load };

  log(`Found ${docs.length} redirects.`);

  const redirects = await Promise.all(docs.map(async (doc) => {
    const redirect = doc.mutations.Website.redirects;
    const from = redirect.charAt(0) === '/' ? redirect : `/${redirect}`;
    const slug = BaseDB.get(doc, 'mutations.Website.slug');
    const to = await canonicalPathFor({ slug, ...doc }, context);
    return { from, to };
  }));

  log('Beginning bulk write process...');

  const bulkOps = redirects.map(({ from, to }) => ({
    updateOne: {
      filter: { from },
      update: { $set: { from, to } },
      upsert: true,
    },
  }));

  const { matchedCount } = await redirectsColl.bulkWrite(bulkOps);
  log('Bulk write complete.', matchedCount);

  log('Creating index...');
  await redirectsColl.createIndex({ from: 1 }, { unique: true });
  log('Indexing complete.');

  await basedb.close();
};

run().catch(e => setImmediate(() => { throw e; }));
