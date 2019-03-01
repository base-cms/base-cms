const eq = require('./eq');
const gt = require('./gt');
const gte = require('./gte');
const log = require('./log');
const lt = require('./lt');
const lte = require('./lte');
const placeholderAd = require('./placeholder-ad');
const registerHelper = require('../engine/register-helper');
const replace = require('./replace');

module.exports = () => {
  registerHelper('eq', eq);
  registerHelper('gt', gt);
  registerHelper('gte', gte);
  registerHelper('log', log);
  registerHelper('lt', lt);
  registerHelper('lte', lte);
  registerHelper('placeholder-ad', placeholderAd);
  registerHelper('replace', replace);
};
