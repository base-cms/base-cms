const aerilon = require('./aerilon');
const caprica = require('./caprica');
const picon = require('./picon');
const gemenon = require('./gemenon');
const leonis = require('./leonis');
const tauron = require('./tauron');

module.exports = tenant => ({
  aerilon: aerilon(tenant),
  caprica: caprica(tenant),
  picon: picon(tenant),
  gemenon: gemenon(tenant),
  leonis: leonis(tenant),
  tauron: tauron(tenant),
});
