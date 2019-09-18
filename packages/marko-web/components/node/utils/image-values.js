const imageHeight = require('./image-height');

module.exports = ({ fluid, ar, width = 320 }) => {
  if (fluid === true) {
    if (ar) return { modifier: `fluid-${ar.replace(':', 'by')}` };
    return { modifier: 'fluid' };
  }
  if (ar) {
    return { width, height: imageHeight(width, ar) };
  }
  return { width };
};
