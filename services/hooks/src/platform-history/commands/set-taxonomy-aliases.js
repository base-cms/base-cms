const { eachSeries } = require('@base-cms/async');
const { update } = require('../taxonomy');
const getDB = require('../utils/get-db');

const { log } = console;

const run = async () => {
  const [, , stack, tenant] = process.argv;
  const db = await getDB(stack, tenant);

  const topLevel = await db.find('platform.Taxonomy', { parent: { $exists: false } }, {
    projection: { _id: 1, name: 1, type: 1 },
  });

  let index = 0;
  await eachSeries(topLevel, async (taxonomy) => {
    const { _id, name, type } = taxonomy;
    index += 1;
    log(`Updating ${type} ${name} (${_id}) [${index}/${topLevel.length}]...`);
    await update(db, _id);
  });
  await db.close();
};

process.on('unhandledRejection', (e) => { throw e; });
run().then(() => log('DONE!')).catch(e => setImmediate(() => { throw e; }));
