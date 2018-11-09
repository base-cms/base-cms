const { execute, makePromise } = require('apollo-link');
const link = require('./link');

module.exports = {
  query(operation) {
    return makePromise(execute(link, operation));
  },
};
