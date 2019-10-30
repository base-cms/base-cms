const { iterateCursor } = require('@base-cms/db/utils');
const { get } = require('@base-cms/object-path');
const runner = require('./utils/runner');

const { log } = console;

const DEBUG = true;
const WRITE = false;

runner(async (contentColl) => {
  log('Retrieving content with maligned bodies...');

  const cursor = await contentColl.find({
    body: /((?!<p).)*/,
    _id: 13290564,
    type: 'Company',
    $or: [
      { 'legacy.lop.body.en.0.value': /<p/ },
      { 'legacy.lop.body.und.0.value': /<p/ },
    ],
  }, {
    projection: {
      body: 1,
      'legacy.lop.body': 1,
    },
  });

  const results = [];
  await iterateCursor(cursor, async (doc) => {
    const { _id } = doc;
    const body = get(doc, 'legacy.lop.body.und.0.value', get(doc, 'legacy.lop.body.en.0.value'));

    if (!body) return;
    const $set = {
      'legacy.script.body': doc.body,
      body,
    };

    results.push({ filter: { _id }, $set });
  });

  log(`Found ${results.length} content body updates.`);

  return results;
}, WRITE, DEBUG);
