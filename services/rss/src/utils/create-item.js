const { xmlEntities: xml } = require('@base-cms/html');
const { getAsObject } = require('@base-cms/object-path');

module.exports = ({
  name,
  teaser,
  canonicalPath,
  publishedDate,
  authors,
  primarySection,
}, website) => {
  const parts = [
    `<title>${xml.encode(name)}</title>`,
    `<link>${website.origin}${canonicalPath}</link>`,
    `<guid isPermaLink="true">${website.origin}${canonicalPath}</guid>`,
  ];
  if (teaser) parts.push(`<description>${xml.encode(teaser)}</description>`);
  if (publishedDate) parts.push(`<pubDate>${publishedDate}</pubDate>`);
  const author = getAsObject(authors, 'edges.0.node');
  if (author.publicEmail) parts.push(`<author>${author.publicEmail} (${author.firstName} ${author.lastName})</author>`);
  if (primarySection && primarySection.alias !== 'home') {
    parts.push(`<category domain="${website.origin}">${xml.encode(primarySection.fullName.replace('>', '/'))}</category>`);
  }
  return `<item>${parts.join('')}</item>`;
};
