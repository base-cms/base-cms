const { Router } = require('express');
const { json } = require('body-parser');
const jsonErrorHandler = require('../utils/json-error-handler');
const authenticate = require('./authenticate');
const login = require('./login');
const logout = require('./logout');
const profile = require('./profile');
const countries = require('./countries');
const regions = require('./regions');

const router = Router();

router.use(json());
router.post('/authenticate', authenticate);
router.post('/login', login);
router.post('/logout', logout);
router.post('/profile', profile);
router.get('/countries', countries);
router.get('/regions', regions);
router.use(jsonErrorHandler());

module.exports = router;
