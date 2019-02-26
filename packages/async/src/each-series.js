const eachSeries = require('async/eachSeries');

module.exports = (coll, iteratee) => new Promise((resolve, reject) => {
  eachSeries(coll, iteratee, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});
