const createDB = require('./src/basedb');

const { log } = console;
const { TENANT_KEY } = process.env;
const basedb = createDB(TENANT_KEY);

const run = async () => {
  const client = await basedb.client.connect();
  log(`BaseCMS DB connected to ${client.s.url} for ${basedb.tenant}`);

  const [contentColl, assetsColl] = await Promise.all([
    basedb.collection('platform', 'Content'),
    basedb.collection('platform', 'Asset'),
  ]);

  const docs = await contentColl.aggregate([
    { $match: { type: 'Company', 'images.0': { $exists: true } } },
    { $unwind: '$images' },
    { $project: { imageId: '$images' } },
  ]).toArray();

  const imageIds = docs.map(doc => doc.imageId);
  const { result = {} } = await assetsColl.updateMany({
    _id: { $in: imageIds },
  }, {
    $set: { isLogo: true },
  });

  log(`Updated ${result.n} images.`);

  await basedb.close();
};

run().catch(e => setImmediate(() => { throw e; }));
