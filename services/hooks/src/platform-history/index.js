const History = require('./history');

module.exports = async (db, data) => {
  const history = new History(data);
  console.log(history.id(), history.namespace(), history.resource());
  return {};
};
