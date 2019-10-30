const { iterateCursor } = require('@base-cms/db/utils');
const { get } = require('@base-cms/object-path');
// const { inspect } = require('util');
// const dataFilter = require('./utils/data-filter');
// const dataMapper = require('./utils/data-mapper');
const runner = require('./utils/runner');

const { log } = console;

const DEBUG = true;
const WRITE = false;

runner(async (contentColl) => {
  log('Retrieving content with maligned bodies...');

  const cursor = await contentColl.find({
    body: /^(?!<p)/,
    // _id: 13306089,
    // type: 'Company',
    $or: [
      { 'legacy.raw.body.en.0.value': /^<p/ },
      { 'legacy.raw.body.und.0.value': /^<p/ },
    ],
  }, {
    projection: {
      body: 1,
      'legacy.raw.body': 1,
    },
  });

  const results = [];
  await iterateCursor(cursor, async (doc) => {
    if (typeof doc === 'object') {
      const { _id } = doc;
      const body = get(doc, 'legacy.raw.body.und.0.value', get(doc, 'legacy.raw.body.en.0.value'));

      if (!body || body === doc.body) return;
      const $set = {
        'legacy.script.body': doc.body,
        body,
      };

      results.push({ filter: { _id }, $set });
    }
  });

  log(`Found ${results.length} content body updates.`);

  return results;
}, WRITE, DEBUG);
