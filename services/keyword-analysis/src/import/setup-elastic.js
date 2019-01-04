const chalk = require('chalk');
const elastic = require('../elastic');
const {
  filter,
  analyzer,
  index: ELASTIC_INDEX,
  type: ELASTIC_TYPE,
} = require('../elastic/index-settings');

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
    log(chalk`{dim Index removed.}`);
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
    log(chalk`{dim Index created.}`);
    // Create mappings.
    await elastic.putMapping(ELASTIC_INDEX, ELASTIC_TYPE, {
      properties: {
        name: {
          type: 'text',
          term_vector: 'with_positions_offsets',
          fields: {
            english: { type: 'text', analyzer: 'english' },
          },
        },
        type: { type: 'keyword' },
        body: {
          type: 'text',
          term_vector: 'with_positions_offsets',
          fields: {
            english: { type: 'text', analyzer: 'english' },
          },
        },
        teaser: {
          type: 'text',
          term_vector: 'with_positions_offsets',
          fields: {
            english: { type: 'text', analyzer: 'english' },
          },
        },
        taxonomy: {
          type: 'text',
          term_vector: 'with_positions_offsets',
          fields: {
            english: { type: 'text', analyzer: 'english' },
          },
        },
        terms: { type: 'keyword' },
      },
    });
    log(chalk`{dim Index mappings created.}`);
  }
  log(chalk`{blue Elasticsearch setup} {green complete}`);
};
