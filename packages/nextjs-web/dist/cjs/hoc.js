'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-cd896063.js');
var React = require('react');
var React__default = _interopDefault(React);
var __chunk_2 = require('./chunk-7917b9e8.js');
var utils = require('./utils.js');
require('object-path');
var __chunk_4 = require('./chunk-6748c5a0.js');
var PropTypes = _interopDefault(require('prop-types'));
require('next/head');
var componentsHead = require('./components-head.js');
var gql = _interopDefault(require('graphql-tag'));

var doc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WithDynamicPageFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ContentPage"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"teaser"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alias"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"body"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"description"},"arguments":[],"directives":[]}]}}]}}],"loc":{"start":0,"end":138}};
    doc.loc.source = {"body":"fragment WithDynamicPageFragment on ContentPage {\n  id\n  name\n  type\n  teaser\n  alias\n  body\n  metadata {\n    title\n    description\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

var _jsxFileName = "/base-cms/packages/nextjs-web/src/hoc/withRequestOrigin.jsx";
var withRequestOrigin = (function (Page) {
  var WithRequestOrigin =
  /*#__PURE__*/
  function (_Component) {
    __chunk_1._inherits(WithRequestOrigin, _Component);

    function WithRequestOrigin() {
      __chunk_1._classCallCheck(this, WithRequestOrigin);

      return __chunk_1._possibleConstructorReturn(this, __chunk_1._getPrototypeOf(WithRequestOrigin).apply(this, arguments));
    }

    __chunk_1._createClass(WithRequestOrigin, [{
      key: "render",

      /**
       *
       */
      value: function render() {
        return React__default.createElement(Page, __chunk_1._extends({}, this.props, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 28
          },
          __self: this
        }));
      }
    }], [{
      key: "getInitialProps",

      /**
       *
       */
      value: function () {
        var _getInitialProps = __chunk_1._asyncToGenerator(
        /*#__PURE__*/
        __chunk_2._regeneratorRuntime.mark(function _callee(ctx) {
          var pageProps, req, requestOrigin;
          return __chunk_2._regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!Page.getInitialProps) {
                    _context.next = 4;
                    break;
                  }

                  _context.next = 3;
                  return Page.getInitialProps(ctx);

                case 3:
                  pageProps = _context.sent;

                case 4:
                  req = ctx.req;
                  requestOrigin = req ? "".concat(req.protocol, "://").concat(req.get('host')) : "".concat(window.location.protocol, "//").concat(window.location.host);
                  return _context.abrupt("return", __chunk_1._objectSpread({}, pageProps, {
                    requestOrigin: requestOrigin
                  }));

                case 7:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function getInitialProps(_x) {
          return _getInitialProps.apply(this, arguments);
        }

        return getInitialProps;
      }()
    }]);

    return WithRequestOrigin;
  }(React.Component);

  WithRequestOrigin.displayName = "WithRequestOrigin(".concat(utils.componentDisplayName(Page), ")");
  WithRequestOrigin.propTypes = __chunk_1._objectSpread({}, Page.propTypes, {
    requestOrigin: PropTypes.string.isRequired
  });
  return WithRequestOrigin;
});

var _jsxFileName$1 = "/base-cms/packages/nextjs-web/src/hoc/withDynamicPage.jsx";

function _templateObject() {
  var data = __chunk_1._taggedTemplateLiteral(["\n    query WithDynamicPage($input: ContentPageQueryInput!) {\n      contentPage(input: $input) {\n        ...WithDynamicPageFragment\n        ", "\n      }\n    }\n    ", "\n    ", "\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
/**
 *
 * @param {object} params
 * @param {string|object} params.fragment The query fragment, either as
 *                                        a string or a gql AST object.
 */

var buildQuery = function buildQuery(_ref) {
  var fragment = _ref.fragment;

  var _extractFragmentData = utils.extractFragmentData({
    fragment: fragment
  }),
      spreadFragmentName = _extractFragmentData.spreadFragmentName,
      processedFragment = _extractFragmentData.processedFragment;

  return gql(_templateObject(), spreadFragmentName, doc, processedFragment);
};
/**
 *
 * @param {object} Page
 * @param {object} options
 * @param {?string|object} options.fragment A ContentPage fragment specifying additional fields
 */

var withDynamicPage = (function (Page) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    fragment: null
  };

  var WithDynamicPage =
  /*#__PURE__*/
  function (_Component) {
    __chunk_1._inherits(WithDynamicPage, _Component);

    function WithDynamicPage() {
      __chunk_1._classCallCheck(this, WithDynamicPage);

      return __chunk_1._possibleConstructorReturn(this, __chunk_1._getPrototypeOf(WithDynamicPage).apply(this, arguments));
    }

    __chunk_1._createClass(WithDynamicPage, [{
      key: "render",

      /**
       *
       */
      value: function render() {
        var _this$props = this.props,
            requestOrigin = _this$props.requestOrigin,
            page = _this$props.page;
        var metadata = page.metadata,
            alias = page.alias;
        return React__default.createElement(React__default.Fragment, null, React__default.createElement(__chunk_4.SiteConfigContext.Consumer, {
          __source: {
            fileName: _jsxFileName$1,
            lineNumber: 89
          },
          __self: this
        }, function (config) {
          return React__default.createElement(componentsHead.PageTitle, {
            value: metadata.title,
            siteName: config.get('name'),
            __source: {
              fileName: _jsxFileName$1,
              lineNumber: 90
            },
            __self: this
          });
        }), React__default.createElement(componentsHead.MetaDescription, {
          value: metadata.description,
          __source: {
            fileName: _jsxFileName$1,
            lineNumber: 92
          },
          __self: this
        }), React__default.createElement(componentsHead.RelCanonical, {
          origin: requestOrigin,
          pathname: alias,
          __source: {
            fileName: _jsxFileName$1,
            lineNumber: 93
          },
          __self: this
        }), React__default.createElement(Page, __chunk_1._extends({}, this.props, {
          __source: {
            fileName: _jsxFileName$1,
            lineNumber: 94
          },
          __self: this
        })));
      }
    }], [{
      key: "getInitialProps",

      /**
       *
       */
      value: function () {
        var _getInitialProps = __chunk_1._asyncToGenerator(
        /*#__PURE__*/
        __chunk_2._regeneratorRuntime.mark(function _callee(ctx) {
          var pageProps, fragment, query, apollo, alias, input, variables, _ref2, data, contentPage;

          return __chunk_2._regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!Page.getInitialProps) {
                    _context.next = 4;
                    break;
                  }

                  _context.next = 3;
                  return Page.getInitialProps(ctx);

                case 3:
                  pageProps = _context.sent;

                case 4:
                  fragment = options.fragment;
                  query = ctx.query, apollo = ctx.apollo; // Get the content alias from the page query

                  alias = query.alias;

                  if (alias) {
                    _context.next = 9;
                    break;
                  }

                  throw utils.httpErrors.notFound('No content page alias was provided.');

                case 9:
                  // Query for the content page object using the alias, via the inject apollo client.
                  input = {
                    alias: alias
                  };
                  variables = {
                    input: input
                  };
                  _context.next = 13;
                  return apollo.query({
                    query: buildQuery({
                      fragment: fragment
                    }),
                    variables: variables
                  });

                case 13:
                  _ref2 = _context.sent;
                  data = _ref2.data;
                  contentPage = data.contentPage;

                  if (contentPage) {
                    _context.next = 18;
                    break;
                  }

                  throw utils.httpErrors.notFound("No content page was found for alias '".concat(alias, "'"));

                case 18:
                  return _context.abrupt("return", __chunk_1._objectSpread({
                    page: contentPage
                  }, pageProps));

                case 19:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function getInitialProps(_x) {
          return _getInitialProps.apply(this, arguments);
        }

        return getInitialProps;
      }()
    }]);

    return WithDynamicPage;
  }(React.Component);

  WithDynamicPage.displayName = "WithDynamicPage(".concat(utils.componentDisplayName(Page), ")");
  WithDynamicPage.propTypes = __chunk_1._objectSpread({}, Page.propTypes, {
    page: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      teaser: PropTypes.string,
      body: PropTypes.string,
      alias: PropTypes.string.isRequired,
      metadata: PropTypes.object
    }).isRequired
  });
  return withRequestOrigin(WithDynamicPage);
});

exports.withDynamicPage = withDynamicPage;
exports.withRequestOrigin = withRequestOrigin;
