const { Router } = require('express');
const routes = require('./routes');

module.exports = ({ exports }) => {
  const router = Router();
  routes(router, { exports });
  return router;
};
