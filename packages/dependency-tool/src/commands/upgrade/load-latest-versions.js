const loadVersionInfo = require('./load-version-info');

module.exports = async names => Promise.all(names.map(async (name) => {
  const { versions, latest } = await loadVersionInfo(name);
  return { name, latest, versions };
}));
