const { join } = require('path');

module.exports = {
  extends: 'airbnb',
  plugins: [
    'react',
  ],
  env: {
    browser: true,
  },
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { packageDir: [join(__dirname, 'package.json'), join(__dirname, '../../package.json')] },
    ],
  },
};
