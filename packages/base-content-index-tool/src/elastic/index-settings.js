module.exports = {
  filter: {
    word_delimiter_catenate: { type: 'word_delimiter', generate_word_parts: false, catenate_all: true },
    english_stop: { type: 'stop', stopwords: '_english_' },
    english_stem: { type: 'stemmer', name: 'english' },
  },
  analyzer: {
    tokenizer: 'classic',
    filter: [
      'word_delimiter_catenate',
      'lowercase',
      'asciifolding',
      'english_stop',
      'english_stem',
    ],
    char_filter: ['html_strip'],
  },
};
