const chalk = require('chalk');
const base4 = require('../base4');

const { log } = console;

/**
 *
 */
module.exports = async () => {
  const map = {};
  log(chalk`{dim Loading keywords from website sections.}`);

  const query = { status: 1 };
  const sections = await base4.find('website.Section', query, { keywords: 1, alias: 1 }, true);
  sections.forEach((section) => {
    const { alias } = section;
    const keywords = Object.prototype.hasOwnProperty.call(section, 'keywords') && section.keywords
      ? section.keywords
      : alias.replace(/-/g, ' ').split('/');
    map[alias] = keywords;
  });

  log(chalk`{dim Returning ${Object.keys(map).length} keyword sets.}`);
  return map;
};
