const aerilon = require('./aerilon');
const caprica = require('./caprica');
const picon = require('./picon');

module.exports = tenant => ({
  aerilon: aerilon(tenant),
  caprica: caprica(tenant),
  picon: picon(tenant),
});
