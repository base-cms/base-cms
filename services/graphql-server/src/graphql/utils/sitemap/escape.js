module.exports = (value) => {
  if (!value) return '';
  return `${value}`
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/'/g, '&apos;')
    .replace(/"/g, '&quot;')
    .replace(/>/g, '&gt;')
    .replace(/</g, '&lt;');
};
