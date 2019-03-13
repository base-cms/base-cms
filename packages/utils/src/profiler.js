const { hrtime } = process;

const { log } = console;

module.exports = () => {
  const startTimes = {};

  const start = (key) => {
    startTimes[key] = hrtime();
  };

  const stop = (key) => {
    const s = startTimes[key];
    const [secs, ns] = process.hrtime(s);
    log('Profile for', key, `${(secs * 1000) + (ns / 1000000)}ms`);
  };


  return {
    start,
    stop,
  };
};
