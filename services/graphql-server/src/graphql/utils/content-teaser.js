const { get } = require('@base-cms/object-path');
const { stripHtml } = require('@base-cms/html');

const cleanTeaser = value => String(value || '').trim();

const getTeaser = (mutation, content) => {
  const teaser = cleanTeaser(get(content, 'teaser', ''));
  if (!mutation) return teaser;
  return cleanTeaser(get(content, `mutations.${mutation}.teaser`, teaser));
};

const truncateTeaser = (value, { maxLength, truncatedSuffix }) => {
  if (!maxLength) return value;
  // @todo This strips HTML from truncated teasers. We could attempt to preserve it?
  const stripped = stripHtml(value);

  let truncated;
  const words = stripped.split(' ').filter(v => v);
  words.forEach((word) => {
    if (!truncated) truncated = word;
    if (truncated.length < maxLength) {
      truncated = `${truncated} ${word}`;
    }
  });
  // Ensure truncated string has punctuation removed.
  return truncatedSuffix ? `${truncated.replace(/\p{P}+?$/u, '')}${truncatedSuffix}` : truncated;
};

const generateTeaser = (teaser, fallback, {
  minLength,
  maxLength,
  useFallback,
  truncatedSuffix,
}) => {
  const opts = { maxLength, truncatedSuffix };
  if (!useFallback) return truncateTeaser(teaser, opts);
  if (minLength) {
    if (teaser.length < minLength) return truncateTeaser(fallback, opts);
    return truncateTeaser(teaser, opts);
  }
  return truncateTeaser(teaser || fallback, opts);
};

module.exports = {
  cleanTeaser,
  getTeaser,
  truncateTeaser,
  generateTeaser,
};
