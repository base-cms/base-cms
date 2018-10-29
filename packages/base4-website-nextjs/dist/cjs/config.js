'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var __chunk_3 = require('./chunk-efb9fd9b.js');
var __chunk_1 = require('./chunk-9e05845b.js');
var utils = require('./utils.js');
require('inflected');
require('moment');
require('object-path');

var ConfigContext = React__default.createContext({});

var withSiteConfig = (function (siteConfig) {
  return function (ComposedComponent) {
    var config = utils.isObject(siteConfig) ? siteConfig : {};

    var WithSiteConfig =
    /*#__PURE__*/
    function (_React$Component) {
      __chunk_1._inherits(WithSiteConfig, _React$Component);

      function WithSiteConfig() {
        __chunk_1._classCallCheck(this, WithSiteConfig);

        return __chunk_1._possibleConstructorReturn(this, __chunk_1._getPrototypeOf(WithSiteConfig).apply(this, arguments));
      }

      __chunk_1._createClass(WithSiteConfig, [{
        key: "render",

        /**
         *
         */
        value: function render() {
          return React__default.createElement(ConfigContext.Provider, {
            value: config
          }, React__default.createElement(ComposedComponent, this.props));
        }
      }], [{
        key: "getInitialProps",

        /**
         *
         * @param {object} args
         */
        value: function () {
          var _getInitialProps = __chunk_1._asyncToGenerator(
          /*#__PURE__*/
          __chunk_3._regeneratorRuntime.mark(function _callee(args) {
            var ctx, composedInitialProps;
            return __chunk_3._regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    ctx = args.ctx; // Add the config to the page context.

                    ctx.siteConfig = config;
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
                    return _context.abrupt("return", __chunk_1._objectSpread({}, composedInitialProps));

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
    }(React__default.Component);

    WithSiteConfig.displayName = "WithSiteConfig(".concat(utils.componentDisplayName(ComposedComponent), ")");
    return WithSiteConfig;
  };
});

exports.SiteConfigContext = ConfigContext;
exports.withSiteConfig = withSiteConfig;
