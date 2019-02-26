const { resolve } = require('path');
const registerHelpers = require('../helpers');
const hbs = require('../engine');

module.exports = (app, siteDir) => {
  const dir = resolve(siteDir);

  // Set the view engine.
  app.engine('hbs', hbs.express4({
    contentHelperName: 'content-for',
    defaultLayout: `${dir}/index`,
    partialsDir: `${dir}/partials`,
    layoutsDir: `${dir}/layouts`,
  }));
  app.set('view engine', 'hbs');
  app.set('views', `${dir}/pages`);

  // Register all built-in handlebars helpers.
  registerHelpers();
};
