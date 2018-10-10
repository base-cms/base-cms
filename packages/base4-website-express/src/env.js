const { cleanEnv, makeValidator } = require('envalid');

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
  LOCAL_GRAPHQL_ENDPOINT: nonemptystr({ desc: 'The local GraphQL path. Default is /graphql', default: '/graphql' }),
});
