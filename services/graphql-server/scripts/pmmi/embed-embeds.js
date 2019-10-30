const { iterateCursor } = require('@base-cms/db/utils');
const { get } = require('@base-cms/object-path');
const { inspect } = require('util');
// const dataFilter = require('./utils/data-filter');
// const dataMapper = require('./utils/data-mapper');
const runner = require('./utils/runner');

const { log } = console;

const DEBUG = true;
const WRITE = false;

runner(async (contentColl) => {
  log('Retrieving non-videos with embed codes...');

  const fields = ['embedCode', 'body'];
  const projection = fields.reduce((obj, field) => ({ ...obj, [field]: 1 }), {});
  projection.legacy = 1;

  const cursor = await contentColl.find({
    type: { $nin: ['Company', 'Video'] },
    'legacy.type': 'article',
    'legacy.source': 'pw_node',
    embedCode: { $exists: true },
    status: 1,
    // _id: 13374608,
  }, { projection });

  const results = [];
  await iterateCursor(cursor, async (doc) => {
    const { _id, embedCode, body } = doc;

    const update = {
      // 'legacy.script.embedCode': embedCode,
      body: `${embedCode}\n${body}`,
      embedCode: undefined,
    };

    if (DEBUG) log(doc._id);
    // if (DEBUG && data) log(inspect(data));
    if (DEBUG && update) log(inspect(update));

    const oks = Object.keys(update);
    if (!oks.length) return;

    const $addToSet = {
      // ...
    };

    const $set = {
      ...oks.reduce((obj, k) => {
        const v = get(doc, k);
        const n = `legacy.script.${k}`;
        return v ? { ...obj, [n]: v } : obj;
      }, {}),
      ...update,
    };

    const $unset = {
      embedCode: 1,
    };

    results.push({
      filter: { _id },
      $set,
      ...(Object.keys($addToSet).length && { $addToSet }),
      ...(Object.keys($unset).length && { $unset }),
    });
  });

  log(`Found ${results.length} items to update.`);

  return results;
}, WRITE, DEBUG);
