const { inspect } = require('util');
const createDB = require('../../../src/basedb');

const { log } = console;
const { TENANT_KEY } = process.env;
const basedb = createDB(TENANT_KEY);

module.exports = async (fn, write = false, debug = true) => {
  try {
    const client = await basedb.client.connect();
    log(`BaseCMS DB connected to ${client.s.url} for ${basedb.tenant}`);

    const contentColl = await basedb.collection('platform', 'Content');

    const updates = await fn(contentColl);
    if (!updates.length) {
      await basedb.close();
      return;
    }

    const bulkOps = updates.map(({ filter, $set, $addToSet }) => ({
      updateOne: {
        filter,
        update: {
          ...($set && { $set }),
          ...($addToSet && { $addToSet }),
        },
      },
    }));

    // An operator is mandatory. Don't fuck it up.
    bulkOps.forEach(({ updateOne }) => {
      if (!Object.keys(updateOne.update).length) throw new Error('No $operator sent with update!');
    });

    if (debug) {
      log(inspect(bulkOps, { colors: true, depth: 10 }));
    }

    if (write) {
      log('Beginning bulk write process...');
      const { matchedCount } = await contentColl.bulkWrite(bulkOps);
      log('Bulk write complete.', matchedCount);
    }

    await basedb.close();
  } catch (e) {
    setImmediate(() => { throw e; });
  }
};
