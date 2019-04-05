const micro = require('micro');

const { indexes, sections, content } = require('./generate/');

const { log } = console;

module.exports = async (res, url) => {
  try {
    const regex = /^\/generate($|\/(?<type>index$|sections$|content$))/;
    const matched = url.match(regex);
    const type = matched && matched.groups.type ? matched.groups.type : 'all';
    log(matched);

    log(`Generating ${type} sitemaps`);

    switch (type) {
      case 'index':
        await indexes();
        res.end('updated sitemap index');
        break;
      case 'sections':
        await sections();
        res.end('updated sections index');
        break;
      case 'content':
        await content();
        res.end('updated content index');
        break;
      default:
        await sections();
        await content();
        await indexes();
        res.end('updated all sitemaps');
        break;
    }
    log('\nDone!');
  } catch (e) {
    micro.creatError(500, e);
  }
};
