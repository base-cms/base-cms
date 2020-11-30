module.exports = (doc, { query, sort }, { input }) => {
  const q = { ...query };

  const {
    scheduledAfter,
    scheduledBefore,
  } = input;

  if (scheduledAfter || scheduledBefore) {
    q.$and = [];
    if (scheduledBefore) q.$and.push({ scheduled: { $lte: scheduledBefore } });
    if (scheduledAfter) q.$and.push({ scheduled: { $gte: scheduledAfter } });
  }
  return { query: q, sort };
};
