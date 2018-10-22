module.exports = text => ({
  tokenizer: 'classic',
  filter: [
    { type: 'word_delimiter', generate_word_parts: false, catenate_all: true },
    'lowercase',
    'asciifolding',
    { type: 'stop', stopwords: '_english_' },
    { type: 'stemmer', name: 'english' },
  ],
  char_filter: ['html_strip'],
  text,
});
