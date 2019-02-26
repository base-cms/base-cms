const series = require('async/series');

module.exports = tasks => new Promise((resolve, reject) => {
  series(tasks, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});
