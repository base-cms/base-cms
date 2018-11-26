const EJSON = require('mongodb-extended-json');
const base64url = require('base64-url');

module.exports = {
  encode(obj) {
    return base64url.encode(EJSON.stringify(obj));
  },

  decode(str) {
    return EJSON.parse(base64url.decode(str));
  },
};
