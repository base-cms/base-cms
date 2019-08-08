const { warn } = console;

module.exports = (message) => {
  try {
    throw new Error(message);
  } catch (e) {
    warn(e.stack.replace(/^Error:/, 'Warning:'));
  }
};
