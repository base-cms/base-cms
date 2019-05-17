const { eachSeries } = require('@base-cms/async');
const { updateContent } = require('../taxonomy');
const getDB = require('../utils/get-db');
const getArgs = require('../utils/get-args');

const { log } = console;

const run = async () => {
  const { stack, tenant } = getArgs();
  const db = await getDB(stack, tenant);

  const items = await db.find('platform.Content', { taxonomy: { $exists: true } }, {
    projection: { _id: 1, taxonomy: 1 },
  });

  let index = 0;
  await eachSeries(items, async (content) => {
    index += 1;
    log(`Updating ID ${content._id} [${index}/${items.length}]...`);
    await updateContent(db, content);
  });
  await db.close();
};

process.on('unhandledRejection', (e) => { throw e; });
run().then(() => log('DONE!')).catch(e => setImmediate(() => { throw e; }));
