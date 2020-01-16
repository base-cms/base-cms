const { getAsObject } = require('@base-cms/object-path');
const depTypes = require('./dep-types');

const { keys } = Object;

module.exports = pkg => depTypes.reduce((set, depType) => {
  keys(getAsObject(pkg, depType))
    .filter(name => /^@base-cms\//.test(name))
    .forEach(name => set.add(name));
  return set;
}, new Set());
