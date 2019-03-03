require('marko/node-require').install();
const path = require('path');
const marko = require('marko/express');
const lasso = require('lasso');
const expressLasso = require('lasso/middleware');


module.exports = (app, dirs, config = {}) => {
  const isProduction = process.env.NODE_ENV === 'production';

  // @todo set configure's baseDir arg??
  lasso.configure({
    plugins: [
      'lasso-marko',
      'lasso-sass',
      // @todo Evalulate this.
      // This matches Bootstrap4's browserlistrc.
      // While BS is not required, shouldn't all CSS use autoprexifer?
      {
        plugin: 'lasso-autoprefixer',
        config: {
          browsers: [
            '>= 1%',
            'last 1 major version',
            'Chrome >= 45',
            'Firefox >= 38',
            'Edge >= 12',
            'Explorer >= 10',
            'iOS >= 9',
            'Safari >= 9',
            'Android >= 4.4',
            'Opera >= 30',
          ],
        },
      },
    ],
    outputDir: dirs.dist,
    bundlingEnabled: true,
    minify: isProduction, // Only minify JS and CSS code in production
    fingerprintsEnabled: isProduction, // Only add fingerprints to URLs in production
    bundles: [
      {
        name: 'website-styles',
        dependencies: [
          {
            path: path.resolve(dirs.app.styles, 'index.scss'),
          },
        ],
      },
    ],
  });

  app.use(marko(config));
  app.use(expressLasso.serveStatic());
};
