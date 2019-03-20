const { get } = require('@base-cms/object-path');
const { stripHtml } = require('@base-cms/html');
const basedb = require('./src/basedb');

const { log } = console;

const run = async () => {
  const client = await basedb.client.connect();
  log(`BaseCMS DB connected to ${client.s.url} for ${basedb.tenant}`);

  const [contentColl] = await Promise.all([
    basedb.collection('platform', 'Content'),
  ]);

  const cursor = await contentColl.find({
    teaser: { $exists: false },
    teaserFallback: { $exists: false },
    body: { $exists: true },
    type: { $nin: ['Contact'] },
  }, {
    projection: { _id: 1, body: 1, 'mutations.Website.body': 1 },
  });

  const docs = await cursor.toArray();

  log(`Found ${docs.length} content items without teasers.`);

  const bulkOps = docs.map((doc) => {
    const body = String(get(doc, 'mutations.Website.body', get(doc, 'body', '')) || '').trim();
    // Remove embeds and HTML.
    const cleaned = stripHtml(body.replace(/%{\[\s.*?\s\]}%/gi, ''));
    // Extract the first sentence of the body.
    const matches = /.*?[.!?]/i.exec(cleaned);
    const teaser = matches && matches[0] ? matches[0] : '';
    const r = { _id: doc._id, teaser };
    return r;
  }).filter(({ teaser }) => teaser).map(doc => ({
    updateOne: {
      filter: { _id: doc._id },
      update: { $set: { teaserFallback: doc.teaser } },
    },
  }));

  const { matchedCount } = await contentColl.bulkWrite(bulkOps);
  log('Bulk write complete. Updated', matchedCount, 'documents');

  await basedb.close();
};

run().catch(e => setImmediate(() => { throw e; }));
