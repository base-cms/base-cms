const { isArray } = Array;

/**
 * Incoming value of `['300x250', '300x600']` becomes
 * `[[300, 250], [300, 600]]`.
 *
 * A single string value of `300x250` becomes
 * `[[300, 250]]`.
 */
module.exports = (value) => {
  const sizes = isArray(value) ? value : [value];
  return sizes.map(size => size.split('x').map(v => Number(v)));
};
