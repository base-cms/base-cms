const { iterateCursor } = require('@base-cms/db/utils');
const { get, getAsArray } = require('@base-cms/object-path');
// const { inspect } = require('util');
// const dataFilter = require('./utils/data-filter');
// const dataMapper = require('./utils/data-mapper');
const runner = require('./utils/runner');

const { log } = console;

const DEBUG = true;
const WRITE = false;

runner(async (contentColl) => {
  log('Retrieving duplicated documents...');

  const projection = {
    relatedTo: 1,
    fileName: 1,
    filePath: 1,
    sourceFile: 1,
    sourceFilename: 1,
    'mutations.Website.redirects': 1,
  };

  const cursor = await contentColl.find({
    type: 'Document',
    'legacy.type': { $exists: true }, // First-order models
    'relatedTo.type': 'Document',
    // 'relatedTo.$id': 15588049,
  }, { projection });

  const results = [];
  await iterateCursor(cursor, async (doc) => {
    const { _id } = doc;
    const { oid } = getAsArray(doc, 'relatedTo').shift() || {};
    const pdf = await contentColl.findOne({ type: 'Document', _id: oid }, { projection });
    if (!pdf) return;

    const {
      fileName,
      filePath,
      sourceFile,
      sourceFilename,
    } = pdf;

    const redirects = getAsArray(pdf, 'mutations.Website.redirects');
    const path = (sourceFile.match(/(\/sites.*$)/) || []).shift();
    if (path) redirects.push(path);
    const $addToSet = { 'mutations.Website.redirects': { $each: redirects } };

    const $set = {
      ...(get(doc, 'fileName') && { 'legacy.script.fileName': get(doc, 'fileName') }),
      ...(get(doc, 'filePath') && { 'legacy.script.filePath': get(doc, 'filePath') }),
      ...(get(doc, 'sourceFile') && { 'legacy.script.sourceFile': get(doc, 'sourceFile') }),
      ...(get(doc, 'sourceFilename') && { 'legacy.script.sourceFilename': get(doc, 'sourceFilename') }),
      fileName,
      filePath,
      sourceFile,
      sourceFilename,
    };

    results.push({ filter: { _id }, $set, $addToSet });
    results.push({ filter: { _id: oid }, $set: { status: 0 } });
  });

  log(`Found ${results.length / 2} duplicates.`);

  return results;
}, WRITE, DEBUG);
