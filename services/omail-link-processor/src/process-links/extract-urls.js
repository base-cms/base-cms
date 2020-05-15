const { isURL } = require('validator');

const matchPattern = new RegExp('(<a[^>]+href=[\'"])(\\s{0,}http.*?)(["\'][^>]*>.*?</a>)', 'igs');

module.exports = (html) => {
  const urls = [];
  let match;
  do {
    match = matchPattern.exec(html);
    if (match) {
      // the url validator will fail if any spaces, <, or > characters are found.
      const temp = match[2].trim()
        .replace(/\s/g, '%20')
        .replace(/</g, '%3C')
        .replace(/>/g, '%3E');
      if (isURL(temp, { protocols: ['http', 'https'], require_protocol: true })) {
        urls.push({ value: match[2], element: match[0] });
      }
    }
  } while (match);
  return urls;
};
