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
