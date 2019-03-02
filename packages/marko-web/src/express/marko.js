require('marko/node-require').install();
const path = require('path');
const marko = require('marko/express');
const lasso = require('lasso');
const expressLasso = require('lasso/middleware');


module.exports = (app, rootDir, config = {}) => {
  const isProduction = process.env.NODE_ENV === 'production';

  lasso.configure({
    plugins: [
      'lasso-marko',
    ],
    outputDir: path.resolve(rootDir, 'dist'),
    bundlingEnabled: true,
    minify: isProduction, // Only minify JS and CSS code in production
    fingerprintsEnabled: isProduction, // Only add fingerprints to URLs in production
  });

  app.use(marko(config));
  app.use(expressLasso.serveStatic());
};
