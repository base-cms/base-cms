const {
  aerilon,
  caprica,
  picon,
  gemenon,
  leonis,
  tauron,
} = require('./basedb')('test');
const { log } = require('./output');

const start = (name, promise, url) => {
  log(`> Connecting to ${name}...`);
  return promise.then((r) => {
    const u = typeof url === 'function' ? url(r) : url;
    log(`> ${name} connected ${u ? `(${u})` : ''}`);
    return r;
  });
};

const stop = (name, promise) => {
  log(`> Disconnecting from ${name}...`);
  return promise.then((r) => {
    log(`> ${name} disconnected`);
    return r;
  });
};

const ping = (name, promise) => promise.then(() => `${name} pinged successfully.`);

module.exports = {
  start: () => Promise.all([
    start('BaseDB Aerilon', aerilon.client.connect(), c => c.s.url),
    start('BaseDB Caprica', caprica.client.connect(), c => c.s.url),
    start('BaseDB Picon', picon.client.connect(), c => c.s.url),
    start('BaseDB Gemenon', gemenon.client.connect(), c => c.s.url),
    start('BaseDB Leonis', leonis.client.connect(), c => c.s.url),
    start('BaseDB Tauron', tauron.client.connect(), c => c.s.url),
  ]),
  stop: () => Promise.all([
    stop('BaseDB Aerilon', aerilon.client.close()),
    stop('BaseDB Caprica', caprica.client.close()),
    stop('BaseDB Picon', picon.client.close()),
    stop('BaseDB Gemenon', gemenon.client.close()),
    stop('BaseDB Leonis', leonis.client.close()),
    stop('BaseDB Tauron', tauron.client.close()),
  ]),
  ping: () => Promise.all([
    ping('BaseDB Aerilon', aerilon.client.command({ ping: 1 })),
    ping('BaseDB Caprica', caprica.client.command({ ping: 1 })),
    ping('BaseDB Picon', picon.client.command({ ping: 1 })),
    ping('BaseDB Gemenon', gemenon.client.command({ ping: 1 })),
    ping('BaseDB Leonis', leonis.client.command({ ping: 1 })),
    ping('BaseDB Tauron', tauron.client.command({ ping: 1 })),
  ]),
};
