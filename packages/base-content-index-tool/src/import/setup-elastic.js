const chalk = require('chalk');
const elastic = require('../elastic');
const env = require('../env');
const { filter, analyzer } = require('../elastic/index-settings');

const { ELASTIC_INDEX, ELASTIC_TYPE } = env;
const { log } = console;

/**
 *
 * @param {boolean} populate
 */
module.exports = async (populate) => {
  log(chalk`{blue Setup Elasticsearch...}`);

  // Delete the index.
  if (populate) {
    await elastic.deleteIndex(ELASTIC_INDEX);
    log(chalk`{gray Index removed.}`);
  }

  const exists = await elastic.indexExists(ELASTIC_INDEX);
  if (!exists) {
    // Create index.
    await elastic.createIndex(ELASTIC_INDEX, {
      settings: {
        analysis: {
          filter,
          analyzer: {
            default: analyzer,
            default_search: analyzer,
          },
        },
      },
    });
    log(chalk`{gray Index created.}`);
    // Create mappings.
    await elastic.putMapping(ELASTIC_INDEX, ELASTIC_TYPE, {
      properties: {
        name: {
          type: 'text',
          fields: { boolsim: { type: 'text', similarity: 'boolean' } },
        },
        type: { type: 'keyword' },
        body: {
          type: 'text',
          fields: { boolsim: { type: 'text', similarity: 'boolean' } },
        },
        teaser: {
          type: 'text',
          fields: { boolsim: { type: 'text', similarity: 'boolean' } },
        },
        taxonomy: {
          type: 'text',
          fields: { boolsim: { type: 'text', similarity: 'boolean' } },
        },
      },
    });
    log(chalk`{gray Index mappings created.}`);
  }
  log(chalk`{blue Elasticsearch setup} {green complete}`);
};
