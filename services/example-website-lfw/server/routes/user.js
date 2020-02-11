const IdentityX = require('@base-cms/marko-web-identity-x');
const IdentityXConfig = require('../../config/identity-x');
const authenticate = require('../templates/user/authenticate');
const login = require('../templates/user/login');
const logout = require('../templates/user/logout');
const register = require('../templates/user/register');

module.exports = (app) => {
  IdentityX(app, IdentityXConfig);

  app.get('/user/authenticate', (req, res) => {
    res.marko(authenticate);
  });

  app.get('/user/login', (req, res) => {
    res.marko(login);
  });

  app.get('/user/logout', (req, res) => {
    res.marko(logout);
  });

  app.get('/user/register', (req, res) => {
    res.marko(register);
  });
};
