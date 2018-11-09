/* eslint-disable no-underscore-dangle */
const fetch = require('isomorphic-unfetch');
const fs = require('fs');
const env = require('./src/env');

const { log } = console;
const { BASE4_GRAPHQL_URL, BASE4_TENANT_KEY, BASE4_API_TOKEN } = env;

// @see https://www.apollographql.com/docs/react/advanced/fragments.html

fetch(BASE4_GRAPHQL_URL, {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    authorization: `Bearer ${BASE4_API_TOKEN}`,
    'x-tenant-key': BASE4_TENANT_KEY,
  },
  body: JSON.stringify({
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
}).then(result => result.json()).then((result) => {
  // here we're filtering out any type information unrelated to unions or interfaces
  const filteredData = result.data.__schema.types.filter(
    type => type.possibleTypes !== null,
  );
  // eslint-disable-next-line no-param-reassign
  result.data.__schema.types = filteredData;
  fs.writeFile('./fragment-types.json', JSON.stringify(result.data), (err) => {
    if (err) log('Error writing fragmentTypes file', err);
    log('Fragment types successfully extracted!');
  });
});
