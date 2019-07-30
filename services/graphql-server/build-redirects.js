const { content: canonicalPathFor, requestParser: getCanonicalRules } = require('@base-cms/canonical-path');
const { BaseDB } = require('@base-cms/db');
const { get } = require('@base-cms/object-path');
const createDB = require('./src/basedb');

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

const iterateCursor = (cursor, cb) => new Promise((resolve, reject) => {
  cursor.forEach(cb, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
});

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
  const sectionIds = await contentColl.distinct('mutations.Website.primarySection.$id', {
    'mutations.Website.redirects.0': { $exists: true },
  });
  log('Getting primarySection references...');

  const load = await getPrimarySectionLoader(sectionIds);
  log('Primary section references loaded.');

  const context = { canonicalRules, load };

  const cursor = await contentColl.aggregate([
    { $match: { 'mutations.Website.redirects.0': { $exists: true } } },
    {
      $project: {
        type: 1,
        'mutations.Website.redirects': 1,
        'mutations.Website.slug': 1,
        'mutations.Website.primarySection': 1,
      },
    },
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

  const results = [];
  await iterateCursor(cursor, async (doc) => {
    if (typeof doc === 'object') {
      const redirect = get(doc, 'mutations.Website.redirects');
      const from = redirect;
      const slug = BaseDB.get(doc, 'mutations.Website.slug');
      const to = await canonicalPathFor({ slug, ...doc }, context);
      results.push({ from, to });
    }
  });
  log(`Found ${results.length} content redirects.`);

  return results;
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
  return Promise.all(docs.filter(doc => typeof doc === 'object').map(async ({ alias, redirects }) => {
    const from = redirects;
    const to = alias;
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
  return Promise.all(docs.filter(doc => typeof doc === 'object').map(async ({ _id, redirects }) => {
    const from = redirects;
    const to = `/magazine/${_id}`;
    return { from, to };
  }));
};

const buildGlobalRedirects = () => {
  const code = TENANT_KEY.split('_')[1];
  const key = code === 'pia' ? 'sr' : code;
  return [
    { from: `/content/${key}/en/video.html`, to: '/videos' },
    { from: `/content/${key}/en/video/video-landing-page.html`, to: '/videos' },
    { from: `/content/${key}/en/currentissue`, to: '/magazine' },
    { from: `/content/${key}/en/past-issues.html`, to: '/magazine' },
    { from: `/content/${key}/en/events.html`, to: '/events' },
    { from: `/content/${key}/en/event-listing.html`, to: '/events' },
    { from: `/content/${key}/en/archives.html`, to: '/magazine' },
    { from: `/content/${key}/en/index.html`, to: '/' },
    { from: `/content/${key}/en/whitpapers.html`, to: '/white-papers' },
    { from: `/content/${key}/en/whitepaper-listings.html`, to: '/white-papers' },
    { from: `/content/${key}/en/whitepaper-listing.html`, to: '/white-papers' },
    { from: `/content/${key}/en/search.html`, to: '/search' },
    { from: `/content/${key}/en/advertise.html`, to: '/page/advertise' },
    { from: `/content/${key}/en/webcasts.html`, to: '/webcasts' },
    { from: `/content/${key}/en/webcast-listing.html`, to: '/webcasts' },
    { from: `/content/${key}/en/podcasts.html`, to: '/podcasts' },
    { from: `/content/${key}/en/index.html`, to: '/' },
    { from: `/content/${key}/en/magazine.html`, to: '/magazine' },
    { from: `/content/${key}/en/about-us.html`, to: '/page/about-us' },
    { from: `/content/${key}/en/newsletter.html`, to: '/subscribe/email' },
    { from: '/past-issues.html', to: '/magazine' },
    { from: '/search.html', to: '/search' },
    { from: '/whitepapers.html', to: '/white-papers' },
    { from: '/whitepaper-listings.html', to: '/white-papers' },
    { from: '/whitepaper-listing.html', to: '/white-papers' },
    { from: '/events.html', to: '/events' },
    { from: '/advertise', to: '/page/advertise' },
    { from: '/advertise.html', to: '/advertise' },
    { from: '/webcasts.html', to: '/webcasts' },
    { from: '/webcast-listing.html', to: '/webcasts' },
    { from: '/events.html', to: '/events' },
    { from: '/event-listing.html', to: '/events' },
    { from: '/podcasts.html', to: '/podcasts' },
    { from: '/index/contact-us.html', to: '/contact-us' },
    { from: '/index/about-us.html', to: '/page/about-us' },
    { from: '/subscribe.html', to: '/subscribe' },
    { from: '/magazine.html', to: '/magazine' },
    { from: '/archives.html', to: '/magazine' },
    { from: '/about-us.html', to: '/page/about-us' },
    { from: '/newsletter.html', to: '/suscribe/email' },
    { from: '/video.html', to: '/videos' },
    { from: '/video/video-landing-page.html', to: '/videos' },
    { from: '/index.html', to: '/' },
  ];
};

const buildWebsiteProductRedirects = async (productColl) => {
  const cursor = await productColl.find({ type: 'Site', redirects: { $exists: true } }, { projection: { redirects: 1 } });
  const docs = await cursor.toArray();
  return docs.filter(({ redirects }) => typeof redirects === 'object').reduce((arr, { redirects }) => {
    Object.keys(redirects).forEach((from) => {
      arr.push({ from, to: redirects[from] });
    });
    return arr;
  }, []);
};

const run = async () => {
  const client = await basedb.client.connect();
  log(`BaseCMS DB connected to ${client.s.url} for ${basedb.tenant}`);

  const [redirectsColl, contentColl, sectionColl, issueColl, productColl] = await Promise.all([
    basedb.collection('website', 'Redirects'),
    basedb.collection('platform', 'Content'),
    basedb.collection('website', 'Section'),
    basedb.collection('magazine', 'Issue'),
    basedb.collection('platform', 'Product'),
  ]);

  const promised = await Promise.all([
    buildContentRedirects(contentColl),
    buildSectionRedirects(sectionColl),
    buildIssueRedirects(issueColl),
    buildGlobalRedirects(),
    buildWebsiteProductRedirects(productColl),
  ]);

  const redirects = promised
    .reduce((arr, el) => arr.concat(el), [])
    .map(({ from, to }) => ({ from: cleanPath(from), to: cleanPath(to) }))
    .filter(({ from, to }) => from && to);

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
