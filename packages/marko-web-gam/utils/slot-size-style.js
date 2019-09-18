const { isArray } = Array;

module.exports = (size) => {
  if (!isArray(size)) return null;
  // The first element is another size array (or a named size). Do not apply style.
  if (isArray(size[0]) || size[0] === 'fluid') return null;
  const [w, h] = size;
  return `width: ${w}px; height: ${h}px;`;
};
