const { Base4RestApiClient } = require('@base-cms/base4-rest-api');
const { BASE4_REST_USERNAME: username, BASE4_REST_PASSWORD: password } = require('./env');

module.exports = ({ uri, options } = {}) => {
  if (!uri) return undefined;

  if (!username || !password) {
    throw new Error('The Base4 REST API username and password env variables are required!');
  }
  return new Base4RestApiClient({
    uri,
    username,
    password,
    options,
  });
};
