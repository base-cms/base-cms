const commonConfig = require('../../../eslintrc.browser');

module.exports = {
  ...commonConfig,
  parserOptions: {
    parser: 'babel-eslint',
  },
};
