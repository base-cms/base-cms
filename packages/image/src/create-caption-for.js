module.exports = (image = {}) => {
  const { caption } = image;
  if (!caption) return '';
  // Replace new lines with <br> elements.
  return caption.replace('\n', '<br>');
};
