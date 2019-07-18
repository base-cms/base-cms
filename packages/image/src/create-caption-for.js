module.exports = (caption) => {
  if (!caption) return '';
  // Replace new lines with <br> elements.
  return `${caption}`.replace('\n', '<br>');
};
