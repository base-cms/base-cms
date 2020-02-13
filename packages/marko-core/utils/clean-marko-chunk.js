const stripComponentJS = chunk => chunk.replace(/<script>\(function\(\){var w=window;w\.\$components=.*w\.\$components}\)\(\)<\/script>/, '');
const stripAppendedJS = chunk => chunk.replace(/<script>\$components=.*\$components<\/script>/, '');
const stripComments = chunk => chunk.replace(/<!--[A-Z][#/].*?-->/g, '');

module.exports = chunk => stripAppendedJS(stripComponentJS(stripComments(chunk)));
