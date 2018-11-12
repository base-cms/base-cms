const broker = require('./broker');

module.exports = async (...args) => {
  await broker.start();
  await broker.waitForServices('db');
  return broker.call(...args);
};
