const { Router } = require('express');
const { json } = require('body-parser');
const jsonErrorHandler = require('../json-error-handler');
const submit = require('./submit');

module.exports = ({ queryFragment, notification, confirmation }) => {
  const router = Router();
  router.use(json());
  router.post('/:id(\\d{8})', submit({ queryFragment, notification, confirmation }));
  router.use(jsonErrorHandler());
  return router;
};
