const { iterateCursor } = require('@base-cms/db/utils');
const { get } = require('@base-cms/object-path');
const moment = require('moment-timezone');
// const { inspect } = require('util');
// const dataFilter = require('./utils/data-filter');
// const dataMapper = require('./utils/data-mapper');
const runner = require('./utils/runner');

const { log } = console;

const DEBUG = true;
const WRITE = false;

runner(async (contentColl) => {
  log('Retrieving events with bad dates...');

  const cursor = await contentColl.find({
    type: 'Event',
    $or: [
      { startDate: { $exists: false } },
      { startDate: { $lt: new Date('1980-01-01') } },
    ],
  }, {
    projection: {
      startDate: 1,
      endDate: 1,
      allDay: 1,
      'legacy.raw.field_event_date': 1,
    },
  });

  const results = [];
  await iterateCursor(cursor, async (doc) => {
    if (typeof doc === 'object') {
      const { _id } = doc;
      const tz = get(doc, 'legacy.raw.field_event_date.und.0.timezone', get(doc, 'legacy.raw.field_event_date.en.0.timezone', 'America/Chicago'));
      const startDate = moment.tz(get(doc, 'legacy.raw.field_event_date.und.0.value', get(doc, 'legacy.raw.field_event_date.en.0.value')), tz);
      const endDate = moment.tz(get(doc, 'legacy.raw.field_event_date.und.0.value2', get(doc, 'legacy.raw.field_event_date.en.0.value2')), tz);

      if (!moment(startDate).isValid()) return;
      const $set = {
        startDate: startDate.toDate(),
        ...(endDate.isValid() && { endDate: endDate.toDate() }),
        allDay: Boolean(!endDate.isValid()),
      };

      results.push({ filter: { _id }, $set });
    }
  });

  log(`Found ${results.length} event date updates.`);

  return results;
}, WRITE, DEBUG);
