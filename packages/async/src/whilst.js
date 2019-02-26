const whilst = require('async/whilst');

module.exports = (test, iteratee) => new Promise((resolve, reject) => {
  whilst(test, iteratee, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});
