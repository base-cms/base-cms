const { get, set } = require('@base-cms/object-path');
const depTypes = require('./dep-types');

module.exports = (info, pkg) => {
  depTypes.forEach((type) => {
    info.forEach(({ name, latest }) => {
      const depPath = `${type}.${name}`;
      if (get(pkg, depPath)) set(pkg, depPath, `^${latest}`);
    });
  });
  return pkg;
};
