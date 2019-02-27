module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: [
    'import'
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.marko'],
      },
    },
  },
};
