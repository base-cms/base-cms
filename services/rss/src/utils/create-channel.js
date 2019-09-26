const { xmlEntities: xml } = require('@base-cms/html');

module.exports = ({
  title,
  description,
  link,
  language,
}) => {
  if (!title || !link || !description) throw new Error('A channel title, description, and link are required.');
  const parts = [
    `<title>${xml.encode(title)}</title>`,
    `<link>${link}</link>`,
    `<description>${xml.encode(description)}</description>`,
  ];
  if (language) parts.push(`<language>${language}</language>`);
  return `<channel>${parts.join('')}</channel>`;
};
