const eachSeries = require('async/eachSeries');
const each = require('async/each');
const whilst = require('async/whilst');

module.exports = {
  /**
   *
   */
  eachSeriesPromise: (coll, iteratee) => new Promise((resolve, reject) => {
    eachSeries(coll, iteratee, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  }),

  /**
   *
   */
  eachPromise: (coll, iteratee) => new Promise((resolve, reject) => {
    each(coll, iteratee, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  }),

  /**
   *
   */
  whilstPromise: (test, iteratee) => new Promise((resolve, reject) => {
    whilst(test, iteratee, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  }),
};
