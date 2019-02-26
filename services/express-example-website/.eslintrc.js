const { join } = require('path');

module.exports = {
  extends: 'airbnb-base',
  plugins: [
    'import'
  ],
  // @todo This file should eventually be used for a single repo, not the monorepo.
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { packageDir: [join(__dirname, 'package.json'), join(__dirname, '../../package.json')] },
    ],
  },
};
