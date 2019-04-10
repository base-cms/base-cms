const { eachSeries } = require('@base-cms/async');
const basedb = require('./src/basedb');
const indexes = require('./src/graphql/utils/indexes');

const { log } = console;
const { keys } = Object;
const { isArray } = Array;

const run = async () => {
  const client = await basedb.client.connect();
  log(`BaseCMS DB connected to ${client.s.url} for ${basedb.tenant}`);

  const defs = [];
  keys(indexes).forEach((namespace) => {
    const resources = indexes[namespace];
    keys(resources).forEach((resource) => {
      const types = resources[resource];
      keys(types).forEach((type) => {
        types[type].forEach((args) => {
          defs.push({
            namespace,
            resource,
            type,
            args: isArray(args) ? args : [args],
          });
        });
      });
    });
  });

  await eachSeries(defs, async (def) => {
    const {
      namespace,
      resource,
      type,
      args,
    } = def;
    const collection = await basedb.collection(namespace, resource);
    await collection.createIndex(...args);
    log(`${namespace}.${resource} ${type} index created with args:`, args);
  });

  await basedb.close();
};

run().catch(e => setImmediate(() => { throw e; }));
