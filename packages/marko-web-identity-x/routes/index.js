const { Router } = require('express');
const { json } = require('body-parser');
const jsonErrorHandler = require('../utils/json-error-handler');
const authenticate = require('./authenticate');
const comments = require('./comments');
const createComment = require('./create-comment');
const flagComment = require('./flag-comment');
const login = require('./login');
const loginFields = require('./login-fields');
const logout = require('./logout');
const profile = require('./profile');
const countries = require('./countries');
const regions = require('./regions');

const router = Router();

router.use(json());
router.post('/authenticate', authenticate);
router.post('/login', login);
router.post('/login-fields', loginFields);
router.post('/logout', logout);
router.post('/profile', profile);
router.get('/countries', countries);
router.get('/regions', regions);
router.get('/comments/:identifier', comments);
router.post('/comment', createComment);
router.post('/comment/flag/:id', flagComment);
router.use(jsonErrorHandler());

module.exports = router;
