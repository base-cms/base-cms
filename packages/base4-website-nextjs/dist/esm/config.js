import React from 'react';
import { a as _regeneratorRuntime } from './chunk-fd635e66.js';
import { i as _objectSpread, j as _asyncToGenerator, a as _classCallCheck, b as _createClass, c as _possibleConstructorReturn, d as _getPrototypeOf, e as _inherits } from './chunk-1a4eb17c.js';
import { componentDisplayName } from './utils.js';
import 'inflected';
import 'moment';
import 'object-path';

var ConfigContext = React.createContext({});

var withSiteConfig = (function (siteConfig) {
  return function (ComposedComponent) {
    var WithSiteConfig =
    /*#__PURE__*/
    function (_React$Component) {
      _inherits(WithSiteConfig, _React$Component);

      function WithSiteConfig() {
        _classCallCheck(this, WithSiteConfig);

        return _possibleConstructorReturn(this, _getPrototypeOf(WithSiteConfig).apply(this, arguments));
      }

      _createClass(WithSiteConfig, [{
        key: "render",

        /**
         *
         */
        value: function render() {
          return React.createElement(ConfigContext.Provider, {
            value: siteConfig
          }, React.createElement(ComposedComponent, this.props));
        }
      }], [{
        key: "getInitialProps",

        /**
         *
         * @param {object} args
         */
        value: function () {
          var _getInitialProps = _asyncToGenerator(
          /*#__PURE__*/
          _regeneratorRuntime.mark(function _callee(args) {
            var ctx, composedInitialProps;
            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    ctx = args.ctx; // Add the config to the page context.

                    ctx.siteConfig = siteConfig;
                    composedInitialProps = {};

                    if (!ComposedComponent.getInitialProps) {
                      _context.next = 7;
                      break;
                    }

                    _context.next = 6;
                    return ComposedComponent.getInitialProps(args);

                  case 6:
                    composedInitialProps = _context.sent;

                  case 7:
                    return _context.abrupt("return", _objectSpread({}, composedInitialProps));

                  case 8:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          return function getInitialProps(_x) {
            return _getInitialProps.apply(this, arguments);
          };
        }()
      }]);

      return WithSiteConfig;
    }(React.Component);

    WithSiteConfig.displayName = "WithSiteConfig(".concat(componentDisplayName(ComposedComponent), ")");
    return WithSiteConfig;
  };
});

export { ConfigContext as SiteConfigContext, withSiteConfig };
