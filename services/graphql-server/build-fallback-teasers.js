const { get } = require('@base-cms/object-path');
const { stripHtml } = require('@base-cms/html');
const cheerio = require('cheerio');
const createDB = require('./src/basedb');

const { log } = console;
const { TENANT_KEY } = process.env;
const basedb = createDB(TENANT_KEY);

const MIN_LENGTH = 70;

const parse = (value, shouldParse) => {
  if (!shouldParse) return value;
  const $ = cheerio.load(value, { decodeEntities: false });
  // Remove headers, tables, uls/ols and the like.
  const selector = 'h1, h2, h3, h4, h5, h6, table, ul, ol';

  // eslint-disable-next-line func-names
  $(selector).each(function () {
    $(this).replaceWith('');
  });
  return $('body').html();
};

const cleanText = (value, shouldParse) => {
  const trimmed = parse(String((value || '')).trim(), shouldParse);
  // Remove embeds and HTML.
  return stripHtml(trimmed.replace(/%{\[\s.*?\s\]}%/gi, ''));
};
const getWords = value => value.split(' ').filter(v => v);

const buildTeaserFrom = (value) => {
  const words = getWords(value);
  let teaser = '';
  words.forEach((word) => {
    if (teaser.length > MIN_LENGTH && /[.!?]$/.test(teaser)) {
      return;
    }
    if (!teaser) {
      teaser = word;
    } else {
      teaser = `${teaser} ${word}`;
    }
  });
  return teaser;
};

const run = async () => {
  const client = await basedb.client.connect();
  log(`BaseCMS DB connected to ${client.s.url} for ${basedb.tenant}`);

  const [contentColl] = await Promise.all([
    basedb.collection('platform', 'Content'),
  ]);

  const cursor = await contentColl.find({
    body: { $exists: true },
  }, {
    projection: {
      _id: 1,
      body: 1,
      'mutations.Website.body': 1,
      'mutations.Website.teaser': 1,
      teaser: 1,
    },
  });

  const docs = await cursor.toArray();

  log(`Found ${docs.length} content items.`);

  const bulkOps = docs.map((doc) => {
    const body = cleanText(get(doc, 'mutations.Website.body', get(doc, 'body', '')), true);
    const teaser = cleanText(get(doc, 'mutations.Website.teaser', get(doc, 'teaser', '')));
    const fallback = teaser.length < MIN_LENGTH ? buildTeaserFrom(body) : '';

    // if the fallback exists and is also less than the min length,
    // then use the original teaser (if it's set).
    const teaserFallback = fallback.length && fallback.length < MIN_LENGTH && teaser.length
      ? teaser : fallback;

    return {
      _id: doc._id,
      teaserFallback,
      teaser,
      body,
    };
  }).filter(({ teaserFallback }) => teaserFallback).map(doc => ({
    updateOne: {
      filter: { _id: doc._id },
      update: { $set: { teaserFallback: doc.teaserFallback } },
    },
  }));

  const { matchedCount } = await contentColl.bulkWrite(bulkOps);
  log('Bulk write complete. Updated', matchedCount, 'documents');

  await basedb.close();
};

run().catch(e => setImmediate(() => { throw e; }));
