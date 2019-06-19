const each = require('async/each');

module.exports = (coll, iteratee) => new Promise((resolve, reject) => {
  each(coll, iteratee, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});
