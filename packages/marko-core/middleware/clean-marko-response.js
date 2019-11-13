const stripComponentJS = chunk => chunk.replace(/<script>\(function\(\){var w=window;w\.\$components=.*w\.\$components}\)\(\)<\/script>/, '');
const stripAppendedJS = chunk => chunk.replace(/<script>\$components=.*\$components<\/script>/, '');
const stripComments = chunk => chunk.replace(/<!--[A-Z][#/].*?-->/g, '');

module.exports = ({ enabled = true } = {}) => (req, res, next) => {
  const { write } = res;
  res.write = function clean(...args) {
    if (!enabled) {
      write.apply(this, args);
    } else {
      const [chunk] = args;
      const cleanedArgs = [...args];
      cleanedArgs[0] = stripAppendedJS(stripComponentJS(stripComments(chunk)));
      write.apply(this, cleanedArgs);
    }
  };
  next();
};
