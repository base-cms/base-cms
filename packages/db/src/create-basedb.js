const { inspect } = require('util');
const BaseDB = require('./basedb');

const { NODE_ENV, ENABLE_BASEDB_LOGGING } = process.env;
const { log } = console;

const logger = () => {
  let queries = 0;
  let totalDbTime = 0;
  const perMethod = {};
  const perModel = {};
  return (obj) => {
    const { method, data, time } = obj;
    const { modelName } = data;
    perMethod[method] = perMethod[method] ? perMethod[method] + 1 : 1;
    perModel[modelName] = perModel[modelName] ? perModel[modelName] + 1 : 1;
    queries += 1;
    totalDbTime += time;

    log('');
    Object.keys(obj).forEach(key => log(`${key}:`, inspect(obj[key], { colors: true, depth: 10 })));
    log('');
    log({
      queries,
      perMethod,
      perModel,
      totalDbTime,
    });
    log('');
  };
};

const shouldLog = () => {
  if (NODE_ENV !== 'development') return false;
  if (ENABLE_BASEDB_LOGGING === '1' || ENABLE_BASEDB_LOGGING === 'true') return true;
  return false;
};

module.exports = ({ tenant, client, context }) => new BaseDB({
  tenant,
  client,
  context,
  logger: shouldLog() ? logger() : undefined,
});
