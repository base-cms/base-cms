'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const nodeSass = require('node-sass');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    sassOptions: {
      implementation: nodeSass,
    },
    'ember-froala-editor': {
      plugins: [
        'paragraph_format',
        'lists',
        'link',
        'video',
        'image',
        'url',
        'help',
        'quote',
        'char_counter',
        'word_paste',
        'draggable',
        'align',
      ],
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // Bootstrap JS and source maps.
  app.import('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js');
  app.import('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map', { destDir: 'assets' });

  // @todo Add autoprefixer!

  return app.toTree();
};
