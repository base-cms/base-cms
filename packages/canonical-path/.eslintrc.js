const { join } = require('path');

module.exports = {
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { packageDir: [join(__dirname, 'package.json'), join(__dirname, '../../package.json')] },
    ],
  },
};
