const cleanChunk = require('../utils/clean-marko-chunk');

module.exports = ({ enabled = true } = {}) => (req, res, next) => {
  const { write } = res;
  res.write = function clean(...args) {
    const [chunk] = args;
    if (!enabled || typeof chunk !== 'string') {
      write.apply(this, args);
    } else {
      const cleanedArgs = [...args];
      cleanedArgs[0] = cleanChunk(chunk);
      write.apply(this, cleanedArgs);
    }
  };
  next();
};
