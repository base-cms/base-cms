const path = require('path');
const chalk = require('chalk');
const { existsSync, readFileSync } = require('fs');

module.exports = ({ dir }) => {
  const loc = path.join(dir, 'package.json');
  const exists = existsSync(loc);
  if (!exists) throw new Error(chalk`No package file exists for '{gray ${loc}}'`);
  return JSON.parse(readFileSync(loc).toString());
};
