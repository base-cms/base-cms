const micro = require('micro');

const { indexes, sections, content } = require('./generate/');

const { json } = micro;
const { log } = console;

/**
 * Generates one or more sitemaps and stores them in S3.
 */
module.exports = async (res, req) => {
  const { url } = req;
  try {
    const regex = /^\/generate($|\/(?<type>index$|sections$|content$))/;
    const matched = url.match(regex);
    const type = matched && matched.groups.type ? matched.groups.type : 'all';
    const { canonicalRules } = await json(req);

    log(`Generating ${type} sitemaps`);

    switch (type) {
      case 'index':
        await indexes();
        res.end('updated sitemap index');
        break;
      case 'sections':
        await sections(canonicalRules);
        res.end('updated sections index');
        break;
      case 'content':
        await content(canonicalRules);
        res.end('updated content index');
        break;
      default:
        await sections(canonicalRules);
        await content(canonicalRules);
        await indexes();
        res.end('updated all sitemaps');
        break;
    }
    log('\nDone!');
  } catch (e) {
    micro.creatError(500, e);
  }
};
