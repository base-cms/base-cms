module.exports = (full = true) => {
  if (full) {
    process.stdout.write('\x1b[2J');
  } else {
    process.stdout.write('\x1b[0f');
  }
};
