const { URLSearchParams } = require('url');

module.exports = ({ req }) => (new URLSearchParams(req.query)).toString();
