const micro = require('micro');

const { indexes, sections, content } = require('./generate/');

const { json } = micro;
const { log } = console;

/**
 * Generates one or more sitemaps and stores them in S3.
 */
module.exports = async (req, res) => {
  try {
    const body = await json(req);
    const { type, canonicalRules, baseUri } = body;

    log(`Generating ${type} sitemaps`);

    switch (type) {
      case 'index':
        await indexes({ baseUri });
        res.end('updated sitemap index');
        break;
      case 'sections':
        await sections({ baseUri, canonicalRules });
        res.end('updated sections index');
        break;
      case 'content':
        await content({ baseUri, canonicalRules });
        res.end('updated content index');
        break;
      default:
        await sections({ baseUri, canonicalRules });
        await content({ baseUri, canonicalRules });
        await indexes({ baseUri });
        res.end('updated all sitemaps');
        break;
    }
    log('\nDone!');
  } catch (e) {
    micro.creatError(500, e);
  }
};
