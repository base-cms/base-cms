const elastic = require('../elastic');
const { filter, analyzer } = require('../elastic/index-settings');

const { log } = console;

const esOptions = {
  index: 'keyword_analysis',
  type: 'content',
};

module.exports = async ({ batchSize, recreateIndex }) => {
  const { index, type } = esOptions;
  if (recreateIndex) {
    // Delete the index.
    await elastic.deleteIndex(index);
  }

  const exists = await elastic.indexExists(index);
  if (!exists) {
    // Create index.
    await elastic.createIndex(index, {
      settings: {
        analysis: {
          filter,
          analyzer: {
            default: analyzer,
            default_search: analyzer,
          },
        },
      }
    });
    // Create mappings.
    await elastic.putMapping(index, type, {
      properties: {
        name: { type: 'text' },
        body: { type: 'text' },
        teaser: { type: 'text' },
        taxonomy: { type: 'text' },
      },
    });
  }

  // const docs = await base4.find('platform.Content', {
  //   type: { $in: ['Article', 'MediaGallery'] }
  // }, {
  //   projection: {
  //     name: 1,
  //     deck: 1,
  //     body: 1,
  //     taxonomy: 1,
  //   },
  //   limit: 20,
  //   sort: { _id: 1 },
  // });

  // const getTokens = (result) => {
  //   if (!result || !isArray(result.tokens)) return [];
  //   return result.tokens.map(t => t.token);
  // }

  // await eachPromise(docs, async (doc) => {
    // log(doc);
    // const ids = Base4.extractRefIds(taxonomy);
    // if (ids.length) {
    //   const taxonomyDocs = await taxonomyLoader.loadMany(ids);
    //   log(taxonomyDocs.length);
    // }

    // const [nameRes, bodyRes] = await Promise.all([
    //   elastic.analyze(undefined, buildAnalyzeBody(doc.name)),
    //   doc.body ? elastic.analyze(undefined, buildAnalyzeBody(doc.body)) : {},
    // ]);

    // log(getTokens(bodyRes));

    // log({
    //   name: { text: doc.name, tokens: getTokens(nameTokens) },
    //   deck: { text: doc.deck, tokens: getTokens(deckTokens) },
    // });
  // });
};
