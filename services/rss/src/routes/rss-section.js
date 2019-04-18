const { asyncRoute } = require('@base-cms/utils');
const { BaseDB } = require('@base-cms/db');
const { content: canonicalPathFor, requestParser: getCanonicalRules } = require('@base-cms/canonical-path');
const { get } = require('@base-cms/object-path');
const moment = require('moment');
const { getSectionByAlias, getPrimarySectionLoader, getSectionContent } = require('../util');

const { error } = console;

const clean = str => str.replace(/&/g, '&#x26;').replace(/</g, '&#x3C;').replace(/>/g, '&#x3E;').replace(/\\n/g, '');
const formatter = (section = {}, docs = [], baseUri) => `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${clean(get(section, 'title', ''))}</title>
    <link>${baseUri}/${clean(get(section, 'alias', ''))}</link>
    <atom:link href="${baseUri}/rss/${clean(get(section, 'alias', ''))}.xml" rel="self" type="application/rss+xml" />
    <description>${clean(get(section, 'description', ''))}</description>
${docs.reduce((str, content) => `${str}
    <item>
      <title>${clean(get(content, 'name', ''))}</title>
      <link>${get(content, 'url')}</link>
      <description>${clean(get(content, 'teaser', ''))}</description>
      <pubDate>${moment(content.published).format('ddd, DD MMM YYYY HH:mm:ss ZZ')}</pubDate>
      <guid isPermaLink="true">${get(content, 'url')}</guid>
    </item>`, '')}
  </channel>
</rss>`;

module.exports = asyncRoute(async (req, res) => {
  const { baseUri, host } = res.locals;
  const canonicalRules = getCanonicalRules(req);

  try {
    const publication = req.headers['x-publication-name'] || host;
    const { alias } = req.params;
    const section = await getSectionByAlias(alias);
    if (!section) {
      const err = new Error('Not found');
      err.statusCode = 404;
      throw err;
    }
    const docs = await getSectionContent(BaseDB.get(section, '_id'));

    const sectionIds = [...new Set(docs.map((content) => {
      const ref = BaseDB.get(content, 'mutations.Website.primarySection');
      return BaseDB.extractRefId(ref);
    }))];

    // Inject a loader function into the context
    const load = await getPrimarySectionLoader(sectionIds);
    const context = { canonicalRules, load };

    const toFormat = await Promise.all(docs.map(async (content) => {
      const slug = BaseDB.get(content, 'mutations.Website.slug');
      const name = BaseDB.get(content, 'mutations.Website.name');
      const path = await canonicalPathFor({ name, slug, ...content }, context);
      const url = `${baseUri}${path}`;
      return { ...content, url };
    }));
    section.title = `${publication} - ${get(section, 'name')}`;
    res.end(formatter(section, toFormat, baseUri));
  } catch (e) {
    error(e);
    res.status(e.statusCode || 500).send(`Error: ${e.message}`);
  }
});
