const { isArray } = Array;

module.exports = v => (isArray(v) ? v : []);
