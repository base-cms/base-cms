module.exports = ({
  loc,
  caption,
  title,
}) => {
  const parts = [];
  if (caption) parts.push(`<image:caption>${caption}</image:caption>`);
  if (title) parts.push(`<image:title>${title}</image:title>`);
  return `<image:image><image:loc>${loc}</image:loc>${parts.join('')}</image:image>`;
};
