const { SafeString } = require('handlebars');

module.exports = function ifrm(conditional, options) {
  if (conditional) {
    return options.fn(this);
  }
  return new SafeString('__REMOVELINE__');
};
