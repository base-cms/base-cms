const {
  cleanEnv,
  port,
  makeValidator,
} = require('envalid');

const nonemptystr = makeValidator((v) => {
  const err = new Error('Expected a non-empty string');
  if (v === undefined || v === null || v === '') {
    throw err;
  }
  const trimmed = String(v).trim();
  if (!trimmed) throw err;
  return trimmed;
});

module.exports = cleanEnv(process.env, {
  INTERNAL_PORT: port({ desc: 'The internal port that the website will run on.', default: 4008 }),
  EXTERNAL_PORT: port({ desc: 'The external port that the website is exposed on.', default: 4008 }),
  LIVERELOAD_PORT: port({ desc: 'The dev server live reload port.', default: 4009 }),
  GRAPHQL_URI: nonemptystr({ desc: 'The absolute, fully-qualified BaseCMS GraphQL URL/URI.' }),
});
