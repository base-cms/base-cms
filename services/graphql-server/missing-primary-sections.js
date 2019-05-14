const createDB = require('./src/basedb');

const { log } = console;
const { TENANT_KEY } = process.env;
const basedb = createDB(TENANT_KEY);

const run = async () => {
  const client = await basedb.client.connect();
  log(`BaseCMS DB connected to ${client.s.url} for ${basedb.tenant}`);

  const [contentColl, sectionColl] = await Promise.all([
    basedb.collection('platform', 'Content'),
    basedb.collection('website', 'Section'),
  ]);

  const section = await sectionColl.findOne({ alias: 'home' }, { projection: { _id: 1 } });
  if (!section) throw new Error('No website section was found for alias "home"');

  const docs = await contentColl.find({
    $or: [
      { 'mutations.Website.primarySection': { $exists: false } },
      { 'mutations.Website.primarySection.$id': { $exists: false } },
    ],
  }, { projection: { _id: 1 } }).toArray();
  const contentIds = docs.map(doc => doc._id);

  const { dbName } = sectionColl.s;
  const { result = {} } = await contentColl.updateMany({
    _id: { $in: contentIds },
  }, {
    $set: {
      'mutations.Website.primarySection': {
        $ref: 'Section',
        $id: section._id,
        $db: dbName,
      },
    },
  });

  log(`Updated ${result.n} content items.`);

  await basedb.close();
};

run().catch(e => setImmediate(() => { throw e; }));
