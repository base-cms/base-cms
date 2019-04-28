const moment = require('moment');
const createDB = require('./src/basedb');

const { log } = console;
const { TENANT_KEY } = process.env;
const basedb = createDB(TENANT_KEY);

const run = async () => {
  const client = await basedb.client.connect();
  log(`BaseCMS DB connected to ${client.s.url} for ${basedb.tenant}`);

  const [scheduleColl, contentColl] = await Promise.all([
    basedb.collection('website', 'Schedule'),
    basedb.collection('platform', 'Content'),
  ]);


  log('Retrieving aggregated schedules...');
  const maxDate = moment('2038-01-01T00:00:00Z').toDate();
  const cursor = await scheduleColl.aggregate([
    {
      $match: {
        status: 1,
        contentStatus: 1,
        published: { $exists: true },
        section: { $exists: true },
        option: { $exists: true },
        'content.$id': { $exists: true },
      },
    },
    { $addFields: { contentArray: { $objectToArray: '$content' } } },
    { $unwind: '$contentArray' },
    { $match: { 'contentArray.k': '$id' } },
    {
      $project: {
        contentId: '$contentArray.v',
        sectionId: '$section',
        optionId: '$option',
        start: {
          $cond: {
            if: { $gt: ['$startDate', '$published'] },
            then: '$startDate',
            else: '$published',
          },
        },
        end: {
          $cond: {
            if: {
              $lt: [
                { $ifNull: ['$endDate', maxDate] },
                { $ifNull: ['$expires', maxDate] },
              ],
            },
            then: '$endDate',
            else: '$expires',
          },
        },
      },
    },
    { $sort: { start: -1 } },
    {
      $group: {
        _id: '$contentId',
        schedules: {
          $push: {
            sectionId: '$sectionId',
            optionId: '$optionId',
            start: '$start',
            end: '$end',
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        contentId: '$_id',
        schedules: 1,
      },
    },
  ], { allowDiskUse: true });

  const docs = await cursor.toArray();

  log(`Found ${docs.length} content items with schedules.`);
  log('Beginning bulk write process...');

  const bulkOps = docs.map(doc => ({
    updateOne: {
      filter: { _id: doc.contentId },
      update: { $set: { sectionQuery: doc.schedules } },
    },
  }));

  const { matchedCount } = await contentColl.bulkWrite(bulkOps);
  log('Bulk write complete.', matchedCount);

  log('Creating indices...');
  await Promise.all([
    contentColl.createIndex({ 'sectionQuery.sectionId': 1, 'sectionQuery.optionId': 1 }),
    contentColl.createIndex({ 'sectionQuery.sectionId': 1, 'sectionQuery.optionId': 1, primaryImage: 1 }),
    contentColl.createIndex({ 'sectionQuery.start': -1, _id: -1 }),
  ]);
  log('Indexing complete.');

  await basedb.close();
};

run().catch(e => setImmediate(() => { throw e; }));
