const History = require('./history');
const taxonomy = require('./taxonomy');

module.exports = async (db, data) => {
  const history = new History(data);
  switch (history.modelName()) {
    case 'platform.Taxonomy':
      await taxonomy(db, history);
      break;
    default:
      break;
  }
  return {};
};
