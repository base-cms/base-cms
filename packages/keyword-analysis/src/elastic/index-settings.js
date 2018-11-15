const env = require('../env');

const { TENANT_KEY } = env;

module.exports = {
  index: `${TENANT_KEY}_analysis`,
  type: 'content',
  filter: {
    word_delimiter_catenate: {
      type: 'word_delimiter',
      generate_word_parts: false,
      generate_number_parts: false,
      catenate_all: true,
      split_on_case_change: false,
      split_on_numerics: false,
      stem_english_possessive: false,
    },
    english_stop: { type: 'stop', stopwords: '_english_' },
    english_stemmer_light: { type: 'stemmer', name: 'light_english' },
    english_possessive_stemmer: { type: 'stemmer', name: 'possessive_english' },
  },
  analyzer: {
    tokenizer: 'whitespace',
    filter: [
      'english_possessive_stemmer',
      'word_delimiter_catenate',
      'asciifolding',
      'lowercase',
      'english_stop',
      'english_stemmer_light',
    ],
  },
};
