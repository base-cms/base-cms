const { aerilon, caprica, picon } = require('./basedb')('test');
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
  ]),
  stop: () => Promise.all([
    stop('BaseDB Aerilon', aerilon.client.close()),
    stop('BaseDB Caprica', caprica.client.close()),
    stop('BaseDB Picon', picon.client.close()),
  ]),
  ping: () => Promise.all([
    ping('BaseDB Aerilon', aerilon.client.command({ ping: 1 })),
    ping('BaseDB Caprica', caprica.client.command({ ping: 1 })),
    ping('BaseDB Picon', picon.client.command({ ping: 1 })),
  ]),
};
