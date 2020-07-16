module.exports = {
  extends: [
    'airbnb-base',
    'plugin:vue/recommended',
  ],
  env: {
    browser: true,
  },
  rules: {
    'vue/max-attributes-per-line': ['error', {
      singleline: 3,
      multiline: {
        max: 1,
        allowFirstLine: false,
      },
    }],
    'vue/no-v-html': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
