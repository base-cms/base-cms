"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withPlatformContent = exports.checkContent = exports.buildQuery = exports.withPlatformContentPropTypes = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

var _componentDisplayName = _interopRequireDefault(require("../utils/component-display-name"));

var _extractFragmentData2 = _interopRequireDefault(require("../utils/extract-fragment-data"));

var _httpErrors = _interopRequireDefault(require("../utils/http-errors"));

var _redirect = _interopRequireDefault(require("../utils/redirect"));

var _withPlatformContent = _interopRequireDefault(require("../gql/fragments/with-platform-content.graphql"));

var _withRequestOrigin = require("./withRequestOrigin");

var _RelCanonical = _interopRequireDefault(require("../components/RelCanonical"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    query ContentPage($input: RootPlatformContentQueryOne!, $canonicalFields: [PlatfromContentPathField]!) {\n      platformContent(input: $input) {\n        ...WithPlatformContentFragment\n        ", "\n      }\n    }\n    ", "\n    ", "\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var withPlatformContentPropTypes = _objectSpread({
  canonicalPath: _propTypes.default.string.isRequired,
  content: _propTypes.default.shape({
    id: _propTypes.default.number.isRequired,
    name: _propTypes.default.string.isRequired,
    type: _propTypes.default.string.isRequired,
    teaser: _propTypes.default.string,
    body: _propTypes.default.string,
    redirectTo: _propTypes.default.string,
    canonicalPath: _propTypes.default.string.isRequired
  })
}, _withRequestOrigin.withRequestOriginPropTypes);
/**
 *
 * @param {object} params
 * @param {string|object} params.fragment The query fragment, either as
 *                                        a string or a gql AST object.
 */


exports.withPlatformContentPropTypes = withPlatformContentPropTypes;

var buildQuery = function buildQuery(_ref) {
  var fragment = _ref.fragment;

  var _extractFragmentData = (0, _extractFragmentData2.default)({
    fragment: fragment
  }),
      spreadFragmentName = _extractFragmentData.spreadFragmentName,
      processedFragment = _extractFragmentData.processedFragment;

  return (0, _graphqlTag.default)(_templateObject(), spreadFragmentName, _withPlatformContent.default, processedFragment);
};
/**
 *
 * @param {object} content
 * @param {object} ctx
 * @param {?object} ctx.res
 * @param {string} ctx.asPath
 */


exports.buildQuery = buildQuery;

var checkContent = function checkContent(content, _ref2) {
  var res = _ref2.res,
      asPath = _ref2.asPath;
  var redirectTo = content.redirectTo,
      canonicalPath = content.canonicalPath;

  if (redirectTo) {
    (0, _redirect.default)(res, redirectTo);
  } else if (canonicalPath !== asPath) {
    (0, _redirect.default)(res, canonicalPath);
  }
};
/**
 *
 * @param {object} Page
 * @param {object} options
 * @param {?string|object} options.fragment
 */


exports.checkContent = checkContent;

var withPlatformContent = function withPlatformContent(Page) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    fragment: null,
    canonicalFields: ['sectionAlias', 'type', 'id', 'slug']
  };

  var WithPlatformContent =
  /*#__PURE__*/
  function (_Component) {
    _inherits(WithPlatformContent, _Component);

    function WithPlatformContent() {
      _classCallCheck(this, WithPlatformContent);

      return _possibleConstructorReturn(this, _getPrototypeOf(WithPlatformContent).apply(this, arguments));
    }

    _createClass(WithPlatformContent, [{
      key: "render",

      /**
       *
       */
      value: function render() {
        var _this$props = this.props,
            requestOrigin = _this$props.requestOrigin,
            canonicalPath = _this$props.canonicalPath;
        return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_RelCanonical.default, {
          origin: requestOrigin,
          pathname: canonicalPath
        }), _react.default.createElement(Page, this.props));
      }
    }], [{
      key: "getInitialProps",

      /**
       *
       */
      value: function () {
        var _getInitialProps = _asyncToGenerator(
        /*#__PURE__*/
        _regenerator.default.mark(function _callee(ctx) {
          var pageProps, fragment, canonicalFields, query, apollo, id, input, variables, _ref3, data, platformContent, canonicalPath;

          return _regenerator.default.wrap(function _callee$(_context) {
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
                  fragment = options.fragment, canonicalFields = options.canonicalFields;
                  query = ctx.query, apollo = ctx.apollo; // Get the content id from the page query
                  // Note: the content id is required for this HOC to function properly.

                  id = query.id; // Query for the content object using the id, via the inject apollo client.

                  input = {
                    id: Number(id)
                  }; // Pass the canonical args to generate the content's canonical (route) path.

                  variables = {
                    input: input,
                    canonicalFields: canonicalFields
                  };
                  _context.next = 11;
                  return apollo.query({
                    query: buildQuery({
                      fragment: fragment
                    }),
                    variables: variables
                  });

                case 11:
                  _ref3 = _context.sent;
                  data = _ref3.data;
                  platformContent = data.platformContent;

                  if (platformContent) {
                    _context.next = 16;
                    break;
                  }

                  throw _httpErrors.default.notFound("No content was found for id '".concat(id, "'"));

                case 16:
                  // Check content for internal/external redirects, etc.
                  checkContent(platformContent, ctx);
                  canonicalPath = platformContent.canonicalPath; // @todo TextAds and Promotions can use an external URL. We _must_ account for this
                  // when using the `next-routes::Link` component, as external URLs do not inherently
                  // work.

                  return _context.abrupt("return", _objectSpread({
                    content: platformContent,
                    canonicalPath: canonicalPath
                  }, pageProps));

                case 19:
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

    return WithPlatformContent;
  }(_react.Component);

  WithPlatformContent.displayName = "WithPlatformContent(".concat((0, _componentDisplayName.default)(Page), ")");
  return (0, _withRequestOrigin.withRequestOrigin)(WithPlatformContent);
};

exports.withPlatformContent = withPlatformContent;