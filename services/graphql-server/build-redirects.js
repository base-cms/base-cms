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

const buildContentRedirects = async (contentColl) => {
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

  log(`Found ${docs.length} content redirects.`);

  return Promise.all(docs.map(async (doc) => {
    const redirect = doc.mutations.Website.redirects;
    const from = redirect.charAt(0) === '/' ? redirect : `/${redirect}`;
    const slug = BaseDB.get(doc, 'mutations.Website.slug');
    const to = await canonicalPathFor({ slug, ...doc }, context);
    return { from, to };
  }));
};

const buildSectionRedirects = async (sectionColl) => {
  log('Retrieving section redirects...');
  const cursor = await sectionColl.aggregate([
    { $match: { 'redirects.0': { $exists: true } } },
    { $unwind: '$redirects' },
    { $project: { redirects: 1, alias: 1 } },
  ]);
  const docs = await cursor.toArray();

  log(`Found ${docs.length} section redirects.`);
  return Promise.all(docs.map(async ({ alias, redirects }) => {
    const from = redirects.charAt(0) === '/' ? redirects : `/${redirects}`;
    const to = alias.charAt(0) === '/' ? alias : `/${alias}`;
    return { from, to };
  }));
};

const buildIssueRedirects = async (issueColl) => {
  log('Retrieving issue redirects...');
  const cursor = await issueColl.aggregate([
    { $match: { 'redirects.0': { $exists: true } } },
    { $unwind: '$redirects' },
    { $project: { redirects: 1 } },
  ]);
  const docs = await cursor.toArray();

  log(`Found ${docs.length} issue redirects.`);
  return Promise.all(docs.map(async ({ _id, redirects }) => {
    const from = redirects.charAt(0) === '/' ? redirects : `/${redirects}`;
    const to = `/magazine/${_id}`;
    return { from, to };
  }));
};

const buildGlobalRedirects = () => {
  const code = TENANT_KEY.split('_')[1];
  const key = code === 'pia' ? 'sr' : code;
  return [
    { from: `/content/${key}/en/video.html`, to: '/videos' },
    { from: `/content/${key}/en/currentissue`, to: '/magazine' },
    { from: `/content/${key}/en/past-issues.html`, to: '/magazine' },
    { from: `/content/${key}/en/events.html`, to: '/events' },
    { from: `/content/${key}/en/archives.html`, to: '/magazine' },
    { from: `/content/${key}/en/index.html`, to: '/' },
    { from: `/content/${key}/en/whitpapers.html`, to: '/white-papers' },
    { from: `/content/${key}/en/search.html`, to: '/search' },
    { from: `/content/${key}/en/advertise.html`, to: '/page/advertise' },
    { from: `/content/${key}/en/webcasts.html`, to: '/webcasts' },
    { from: `/content/${key}/en/podcasts.html`, to: '/podcasts' },
    { from: `/content/${key}/en/index.html`, to: '/' },
    { from: `/content/${key}/en/magazine.html`, to: '/magazine' },
    { from: `/content/${key}/en/about-us.html`, to: '/page/about-us' },
    { from: `/content/${key}/en/newsletter.html`, to: '/subscribe/email' },
    { from: '/past-issues.html', to: '/magazine' },
    { from: '/search.html', to: '/search' },
    { from: '/whitepapers.html', to: '/white-papers' },
    { from: '/events.html', to: '/events' },
    { from: '/advertise', to: '/page/advertise' },
    { from: '/advertise.html', to: '/advertise' },
    { from: '/webcasts.html', to: '/webcasts' },
    { from: '/podcasts.html', to: '/podcasts' },
    { from: '/index/contact-us.html', to: '/contact-us' },
    { from: '/index/about-us.html', to: '/page/about-us' },
    { from: '/subscribe.html', to: '/subscribe' },
    { from: '/magazine.html', to: '/magazine' },
    { from: '/archives.html', to: '/magazine' },
    { from: '/about-us.html', to: '/page/about-us' },
    { from: '/newsletter.html', to: '/suscribe/email' },
    { from: '/video.html', to: '/videos' },
    { from: '/index.html', to: '/' },
  ];
};

const run = async () => {
  const client = await basedb.client.connect();
  log(`BaseCMS DB connected to ${client.s.url} for ${basedb.tenant}`);

  const [redirectsColl, contentColl, sectionColl, issueColl] = await Promise.all([
    basedb.collection('website', 'Redirects'),
    basedb.collection('platform', 'Content'),
    basedb.collection('website', 'Section'),
    basedb.collection('magazine', 'Issue'),
  ]);

  const contentRedirects = await buildContentRedirects(contentColl);
  const sectionRedirects = await buildSectionRedirects(sectionColl);
  const issueRedirects = await buildIssueRedirects(issueColl);
  const globalRedirects = await buildGlobalRedirects();

  const redirects = [].concat(contentRedirects, sectionRedirects, issueRedirects, globalRedirects);

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
