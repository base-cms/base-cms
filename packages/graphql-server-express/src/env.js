const { str, cleanEnv } = require('envalid');

module.exports = cleanEnv(process.env, {
  BASECMS_MONGODB_URL: str({ desc: 'The BaseCMS MongoDB server URL.' }),
});
