const aerilon = require('./aerilon');
const caprica = require('./caprica');
const picon = require('./picon');
const gemenon = require('./gemenon');
const tauron = require('./tauron');

module.exports = tenant => ({
  aerilon: aerilon(tenant),
  caprica: caprica(tenant),
  picon: picon(tenant),
  gemenon: gemenon(tenant),
  tauron: tauron(tenant),
});
