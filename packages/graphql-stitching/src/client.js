const { execute, makePromise } = require('apollo-link');

module.exports = link => ({
  query(operation) {
    return makePromise(execute(link, operation));
  },
});
