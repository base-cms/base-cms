const { iterateCursor } = require('@base-cms/db/utils');
const { get, getAsArray } = require('@base-cms/object-path');
// const { inspect } = require('util');
const dataFilter = require('./utils/data-filter');
const dataMapper = require('./utils/data-mapper');
const runner = require('./utils/runner');

const { log } = console;

const DEBUG = true;
const WRITE = false;

runner(async (contentColl) => {
  log('Retrieving leadership companies...');

  const fields = [
    'body',
    'address1',
    'address2',
    'city',
    'state',
    'zip',
    'country',
    'phone',
    'mobile',
    'fax',
    'tollfree',
    'email',
    'publicEmail',
    'website',
    'numberOfEmployees',
    'yearsInOperation',
    'salesRegion',
    'salesChannels',
    'trainingInformation',
    'serviceInformation',
    'servicesProvided',
    'productSummary',
    'warrantyInformation',
    'youtube.username',
    'youtube.channelId',
  ];
  const drupalFields = {
    numberOfEmployees: 'employees',
    salesRegion: 'geographic',
    salesChannels: 'channel',
    trainingInformation: 'training',
    serviceInformation: 'service',
    servicesProvided: 'services',
    warrantyInformation: 'warranty',
    website: 'field_link',
  };

  const projection = fields.reduce((obj, field) => ({ ...obj, [field]: 1 }), {});
  projection.legacy = 1;
  projection.socialLinks = 1;
  projection.youtube = 1;
  projection.youtubeVideo = 1;

  const $or = fields.reduce((arr, field) => ([...arr, { [field]: { $exists: false } }]), []);

  const cursor = await contentColl.find({
    type: 'Company',
    $or,
    'legacy.source': { $exists: true },
    // _id: { $in: [13320872, 13369742, 13276314, 13312897, 13306033, 13287760, 13274484] },
    // _id: 13276314,
    // _id: 13369742,
  }, { projection });

  const results = [];
  await iterateCursor(cursor, async (doc) => {
    const { _id } = doc;

    const update = {};
    const data = dataFilter({ doc, fields, map: drupalFields });

    dataMapper({
      data,
      doc,
      fn: ({ value, field }) => {
        if (!update[field]) {
          // @todo below
          // if (target === 'ldc' && field === 'body') return; // do not pull ldc body
          if (field === 'website') {
            update[field] = /^http/.test(value) ? value : `http://${value}`;
          } else {
            update[field] = value;
          }
        }
      },
    });

    // log(doc._id);
    // log(inspect(data));
    // log(inspect(update));

    const socialLinks = [];

    const hasLinkedIn = getAsArray(doc, 'socialLinks').some(({ provider }) => provider === 'linkedin');
    const linkedIn = get(doc, 'legacy.lop.field_ld_linked_in.und.0.url', get(doc, 'legacy.lop.field_ld_linked_in.en.0.url'));
    if (!hasLinkedIn && linkedIn) {
      socialLinks.push({
        provider: 'linkedin',
        label: 'Linked In',
        url: linkedIn.trim(),
      });
    }

    if (!get(doc, 'youtube.username')) {
      const youtubeUsername = get(doc, 'legacy.lop.field_youtube_username.und.0.value', get(doc, 'legacy.lop.field_youtube_username.en.0.value'));
      if (youtubeUsername) update['youtube.username'] = youtubeUsername;
      getAsArray(doc, 'socialLinks').filter(({ provider }) => provider === 'youtube').forEach(({ url }) => {
        if (/channel/.test(url)) {
          const channelId = get(url.match(/channel\/(.*)$/), 1);
          if (channelId) update['youtube.channelId'] = channelId;
        }
        if (/user/.test(url)) {
          const username = get(url.match(/user\/(.*)$/), 1);
          if (username) update['youtube.username'] = username;
        }
      });
    }

    const videos = getAsArray(doc, 'legacy.lop.field_youtube.und').map(({ input }) => input);
    const video = get(doc, 'legacy.lop.field_youtube_video.und.0.input', get(doc, 'legacy.lop.field_youtube_video.en.0.input'));
    if (video) videos.push(video);

    const oks = Object.keys(update);
    if (!oks.length && !socialLinks.length) return;

    const $addToSet = {
      ...(socialLinks.length && { socialLinks: { $each: socialLinks } }),
      ...(videos.length && { 'youtube.videos': { $each: videos } }),
    };

    const $set = {
      ...oks.reduce((obj, k) => {
        const v = get(doc, k);
        const n = `legacy.script.${k}`;
        return v ? { ...obj, [n]: v } : obj;
      }, {}),
      ...update,
    };

    results.push({ filter: { _id }, $set, ...(Object.keys($addToSet).length && { $addToSet }) });
  });

  log(`Found ${results.length} companies to update.`);

  return results;
}, WRITE, DEBUG);
