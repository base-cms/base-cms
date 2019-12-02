const { URLSearchParams } = require('url');
const buildTargeting = require('./build-targeting');

const BASE_URL = 'https://securepubads.g.doubleclick.net/gampad';

/**
 * @param {object} params
 * @param {string} params.action The ad unit action: either `jump` or `ad`.
 * @param {string} params.path The ad unit path.
 * @param {string} params.size The ad unit size, e.g `600x100` or `300x250`.
 * @param {number} params.correlator The ad unit image to click correlator.
 * @param {object} [params.targeting] The ad unit targeting key/value object.
 */
module.exports = ({
  action,
  path,
  size,
  correlator,
  targeting,
} = {}) => {
  const t = buildTargeting(targeting);
  const params = new URLSearchParams({
    iu: path,
    sz: size,
    co: 1,
    c: correlator,
    pre: 1,
    ...(t && { t }),
  });
  return `${BASE_URL}/${action}?${params}`;
};
