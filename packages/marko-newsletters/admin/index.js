const { Router } = require('express');
const routes = require('./routes');

module.exports = ({ templates }) => {
  const router = Router();
  routes(router, { templates });
  return router;
};
