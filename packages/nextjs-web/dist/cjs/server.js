'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-cd896063.js');
var __chunk_2 = require('./chunk-7917b9e8.js');
var nextRoutes = _interopDefault(require('next-routes'));
var next = _interopDefault(require('next'));
var path = require('path');
var express = _interopDefault(require('express'));
var url = require('url');
var http = _interopDefault(require('http'));
var https = _interopDefault(require('https'));
var proxy = _interopDefault(require('http-proxy-middleware'));

var loadServices = (function (url$$1, server) {
  if (!url$$1) throw new Error('No service URL was provided.');
  var parsed = new url.URL(url$$1);
  var agentOpts = {
    keepAlive: true
  };
  var agent = parsed.protocol === 'https:' ? new https.Agent(agentOpts) : new http.Agent(agentOpts);
  server.use('/graphql', proxy({
    agent: agent,
    target: url$$1,
    changeOrigin: true,
    pathRewrite: {
      '^/graphql': '/'
    }
  }));
});

var isFn = function isFn(v) {
  return typeof v === 'function';
};

var isArray = Array.isArray;
/**
 *
 * @param {object} options The server options.
 * @param {string} options.dir The directory of the Next app.
 * @param {boolean} [options.dev] Whether to run Next is dev mode.
 * @param {array} options.routeDefs The route definitions.
 * @param {string} options.serviceUrl The BaseCMS services URL (for GraphQL, RSS, etc)
 * @param {number} [options.port=3005] The port to run the webserver on.
 * @param {function} [options.beforePrepare]
 * @param {function} [options.beforeListen]
 */

var server = /*#__PURE__*/
__chunk_1._asyncToGenerator(
/*#__PURE__*/
__chunk_2._regeneratorRuntime.mark(function _callee() {
  var _ref2,
      _ref2$dir,
      dir,
      _ref2$dev,
      dev,
      routeDefs,
      serviceUrl,
      _ref2$port,
      port,
      beforePrepare,
      beforeListen,
      routes,
      app,
      webserver,
      server,
      _args = arguments;

  return __chunk_2._regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ref2 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, _ref2$dir = _ref2.dir, dir = _ref2$dir === void 0 ? './site' : _ref2$dir, _ref2$dev = _ref2.dev, dev = _ref2$dev === void 0 ? process.env.NODE_ENV !== 'production' : _ref2$dev, routeDefs = _ref2.routeDefs, serviceUrl = _ref2.serviceUrl, _ref2$port = _ref2.port, port = _ref2$port === void 0 ? 3005 : _ref2$port, beforePrepare = _ref2.beforePrepare, beforeListen = _ref2.beforeListen;

          if (isArray(routeDefs)) {
            _context.next = 3;
            break;
          }

          throw new Error('No route definitions were provided!');

        case 3:
          routes = nextRoutes();
          routeDefs.forEach(function (def) {
            return routes.add(def);
          }); // Create the NextJS app.

          app = next({
            dev: dev,
            dir: path.resolve(dir)
          }); // Call the `beforePrepare` hook, if specified.

          if (!isFn(beforePrepare)) {
            _context.next = 9;
            break;
          }

          _context.next = 9;
          return beforePrepare(app);

        case 9:
          _context.next = 11;
          return app.prepare();

        case 11:
          // Create the Express server (but do not listen).
          webserver = express(); // Call the `beforeListen` hook, if specified.

          if (!isFn(beforeListen)) {
            _context.next = 15;
            break;
          }

          _context.next = 15;
          return beforeListen(webserver, app);

        case 15:
          // Load external BaseCMS services (must run before internal site routes).
          loadServices(serviceUrl, webserver); // Attach the website routing handler.

          webserver.use(routes.getRequestHandler(app)); // Run the webserver.

          _context.next = 19;
          return new Promise(function (res, rej) {
            webserver.listen(port, function listen(err) {
              if (err) {
                rej(err);
              } else {
                res(this);
              }
            });
          });

        case 19:
          server = _context.sent;
          return _context.abrupt("return", {
            app: app,
            server: server
          });

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
}));

module.exports = server;
