'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var nextRoutes = _interopDefault(require('next-routes'));

var routes = nextRoutes(); // const nextRoutes = require('next-routes');
// module.exports = nextRoutes();

exports.routes = routes;
