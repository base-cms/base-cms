module.exports = {
  extends: 'airbnb-base',
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
