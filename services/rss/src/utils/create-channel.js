const { xmlEntities: xml } = require('@base-cms/html');

module.exports = ({
  title,
  description,
  link,
  language,
  items,
  mountHref,
}) => {
  if (!title || !link || !description) throw new Error('A channel title, description, and link are required.');
  if (!mountHref) throw new Error('An RSS mount href is required.');
  const parts = [
    `<title>${xml.encode(title)}</title>`,
    `<link>${link}</link>`,
    `<atom:link href="${mountHref}" rel="self" type="application/rss+xml" />`,
    `<description>${xml.encode(description)}</description>`,
  ];
  if (language) parts.push(`<language>${language}</language>`);
  return `<channel>${parts.join('')}${items.join('')}</channel>`;
};
