const withSass = require('@base-cms/base4-website-nextjs-bootstrap/next-config');
const withBaseWebsite = require('@base-cms/base4-website-nextjs/next-config');

module.exports = withSass(withBaseWebsite({
  distDir: '../.next/build',
}));
