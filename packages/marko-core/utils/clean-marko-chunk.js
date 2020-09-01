const stripComponentJS = chunk => chunk.replace(/<script>\(function\(\){var w=window;w\.\$components=.*w\.\$components}\)\(\)<\/script>/, '');
const stripMCJS = chunk => chunk.replace(/<script>\$MC=\(window\.\$MC.+?<\/script>/, '');
const stripAppendedJS = chunk => chunk.replace(/<script>\$components=.*\$components<\/script>/, '');
const stripComments = chunk => chunk.replace(/<!--[A-Z][#/].*?-->/g, '');

module.exports = chunk => stripMCJS(stripAppendedJS(stripComponentJS(stripComments(chunk))));
