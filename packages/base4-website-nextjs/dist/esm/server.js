import { a as _regeneratorRuntime } from './chunk-fd635e66.js';
import { c as _asyncToGenerator } from './chunk-cfc9ba70.js';
import next from 'next';
import baseWebsite from '@base-cms/base4-website-express';
import { resolve } from 'path';
import { routes } from './routing.js';
import 'react';
import './utils.js';
import 'moment';
import 'next-routes';

var isFn = function isFn(v) {
  return typeof v === 'function';
};

var isArray = Array.isArray;
/**
 *
 * @param {object} options The server options.
 * @param {string} options.dir The directory of the Next app.
 * @param {boolean} [options.dev] Whether to run Next is dev mode.
 * @param {array} [options.routeDefs] The route definitions.
 * @param {number} [options.port=3005] The port to run the webserver on.
 * @param {object} [options.webServerOpts] Additional options to send to the web server.
 * @param {function} [options.beforePrepare]
 * @param {function} [options.beforeListen]
 */

var server = /*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
_regeneratorRuntime.mark(function _callee() {
  var _ref2,
      dir,
      _ref2$dev,
      dev,
      routeDefs,
      _ref2$port,
      port,
      webServerOpts,
      beforePrepare,
      beforeListen,
      app,
      webserver,
      server,
      _args = arguments;

  return _regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ref2 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, dir = _ref2.dir, _ref2$dev = _ref2.dev, dev = _ref2$dev === void 0 ? process.env.NODE_ENV !== 'production' : _ref2$dev, routeDefs = _ref2.routeDefs, _ref2$port = _ref2.port, port = _ref2$port === void 0 ? 3005 : _ref2$port, webServerOpts = _ref2.webServerOpts, beforePrepare = _ref2.beforePrepare, beforeListen = _ref2.beforeListen;

          if (isArray(routeDefs)) {
            _context.next = 3;
            break;
          }

          throw new Error('No route definitions were provided!');

        case 3:
          routeDefs.forEach(function (def) {
            return routes.add(def);
          }); // Create the NextJS app.

          app = next({
            dev: dev,
            dir: resolve(dir)
          }); // Call the `beforePrepare` hook, if specified.

          if (!isFn(beforePrepare)) {
            _context.next = 8;
            break;
          }

          _context.next = 8;
          return beforePrepare(app);

        case 8:
          _context.next = 10;
          return app.prepare();

        case 10:
          // Create the Base4 Express server (but do not listen).
          webserver = baseWebsite(webServerOpts).use(routes.getRequestHandler(app)); // Call the `beforeListen` hook, if specified.

          if (!isFn(beforeListen)) {
            _context.next = 14;
            break;
          }

          _context.next = 14;
          return beforeListen(webserver, app);

        case 14:
          _context.next = 16;
          return new Promise(function (res, rej) {
            webserver.listen(port, function listen(err) {
              if (err) {
                rej(err);
              } else {
                res(this);
              }
            });
          });

        case 16:
          server = _context.sent;
          return _context.abrupt("return", {
            app: app,
            server: server
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
}));

export default server;
