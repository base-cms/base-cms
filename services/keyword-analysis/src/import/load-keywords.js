const chalk = require('chalk');
const base4 = require('../base4');

const { log } = console;

/**
 *
 */
module.exports = async () => {
  const map = {};
  log(chalk`{dim Loading keywords from website sections.}`);

  const query = { status: 1, keywords: { $exists: true } };
  const sections = await base4.find('website.Section', query, { alias: 1, keywords: 1 }, true);

  sections.forEach((section) => {
    const { alias, keywords } = section;
    map[alias] = keywords;
  });

  log(chalk`{dim Returning ${Object.keys(map).length} keyword sets.}`);
  return map;
};
