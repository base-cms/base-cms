module.exports = basedb => basedb.strictFindOne('website.Option', {
  name: 'Standard',
  status: 1,
}, {
  projection: { _id: 1 },
});
