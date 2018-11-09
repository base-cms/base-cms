module.exports = {
  extends: 'airbnb',
  plugins: [
    'react',
  ],
  env: {
    browser: true,
  },
  rules: {
    'jsx-a11y/anchor-is-valid': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      { packageDir: [join(__dirname, 'package.json'), join(__dirname, '../../package.json')] },
    ],
  },
};
