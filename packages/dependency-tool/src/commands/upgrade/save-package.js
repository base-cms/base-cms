const path = require('path');
const { writeFileSync } = require('fs');

module.exports = (dir, pkg) => {
  const loc = path.join(dir, 'package.json');
  const json = `${JSON.stringify(pkg, null, 2)}\n`;
  writeFileSync(loc, json);
};
