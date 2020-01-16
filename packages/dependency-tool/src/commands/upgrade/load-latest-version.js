const { exec } = require('child_process');

module.exports = name => new Promise((resolve, reject) => {
  const cmd = `yarn info ${name} versions --json`;
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      reject(err);
    } else if (stderr) {
      reject(stderr);
    } else {
      resolve(JSON.parse(stdout).data.pop());
    }
  });
});
