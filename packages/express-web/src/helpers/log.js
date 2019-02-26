module.exports = (...args) => {
  const toLog = [];
  for (let i = 0; i < args.length - 1; i += 1) {
    toLog.push(args[i]);
  }
  if (!toLog.length) throw new Error('At least one argument must be sent to the {{log}} helper.');
  // eslint-disable-next-line no-console
  console.log(...toLog);
};
