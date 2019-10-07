const createDB = require('./src/basedb');

const { log } = console;
const { TENANT_KEY } = process.env;
const basedb = createDB(TENANT_KEY);

const run = async () => {
  const client = await basedb.client.connect();
  log(`BaseCMS DB connected to ${client.s.url} for ${basedb.tenant}`);

  const sites = await basedb.find('platform.Product', { status: 1, type: 'Site' }, {
    projection: { _id: 1, url: 1, name: 1 },
  });
  if (sites.length < 1) throw new Error('No website product was found.');
  if (sites.length > 1) throw new Error('You cannot run this script on multi-site instances.');

  const site = sites[0];
  log(site);

  const collection = await basedb.collection('platform', 'Product');

  await collection.updateMany({ type: 'Newsletter' }, { $set: { siteId: site._id } });
  log('Site ID added to all website products.');

  await collection.createIndex({ status: 1, type: 1, alias: 1 });
  log('New index created.');

  await basedb.close();
};

run().catch(e => setImmediate(() => { throw e; }));
