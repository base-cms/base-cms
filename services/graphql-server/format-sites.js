const { eachSeries } = require('@base-cms/async');
const createDB = require('./src/basedb');

const { log } = console;
const { TENANT_KEY } = process.env;
const basedb = createDB(TENANT_KEY);

const run = async () => {
  const client = await basedb.client.connect();
  log(`BaseCMS DB connected to ${client.s.url} for ${basedb.tenant}`);

  const admin = await basedb.client.admin();
  const list = await admin.listDatabases({ nameOnly: true });

  await eachSeries(list.databases, async (db) => {
    if (/^([a-z]+)_([a-z]+)_platform$/.test(db.name)) {
      const coll = await basedb.client.collection(db.name, 'Product');
      log(`Product collection loaded for ${db.name}.`);
      const projection = {
        name: 1,
        url: 1,
        assetHost: 1,
        imageHost: 1,
      };
      const sites = await coll.find({ type: 'Site', url: { $exists: true } }, { projection }).toArray();
      await eachSeries(sites, async (site) => {
        log(`Processing site ${site.name}...`);
        if (!site.url) throw new Error(`No URL found for ${site.name}`);
        const $set = {};
        $set.url = `www.${site.url.trim()
          .replace(/^http:\/\//, '')
          .replace(/^https:\/\//, '')
          .replace(/^www\./, '')}`;
        if (!site.assetHost) $set.assetHost = $set.url.replace(/^www\./, 'cdn.');
        if (!site.imageHost) $set.imageHost = $set.url.replace(/^www\./, 'img.');
        log($set);
        await coll.updateOne({ _id: site._id }, { $set });
        log('Update complete.');
      });
    }
  });

  await basedb.close();
  log('DONE!');
};

run().catch(e => setImmediate(() => { throw e; }));
