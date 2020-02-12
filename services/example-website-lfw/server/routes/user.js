const IdentityX = require('@base-cms/marko-web-identity-x');
const config = require('../../config/identity-x');
const authenticate = require('../templates/user/authenticate');
const login = require('../templates/user/login');
const logout = require('../templates/user/logout');
const profile = require('../templates/user/profile');
const register = require('../templates/user/register');

module.exports = (app) => {
  IdentityX(app, config);

  app.get(config.getEndpointFor('authenticate'), (req, res) => {
    res.marko(authenticate);
  });

  app.get(config.getEndpointFor('login'), (req, res) => {
    res.marko(login);
  });

  app.get(config.getEndpointFor('logout'), (req, res) => {
    res.marko(logout);
  });

  app.get(config.getEndpointFor('profile'), (req, res) => {
    res.marko(profile);
  });

  app.get(config.getEndpointFor('register'), (req, res) => {
    res.marko(register);
  });
};
