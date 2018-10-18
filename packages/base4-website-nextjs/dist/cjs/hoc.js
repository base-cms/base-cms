'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_3 = require('./chunk-efb9fd9b.js');
var __chunk_4 = require('./chunk-0056f8e4.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var __chunk_2 = require('./chunk-f0af9a84.js');
var gql = _interopDefault(require('graphql-tag'));
var routing = require('./routing.js');
var __chunk_5 = require('./chunk-1ccc7e43.js');
require('./chunk-c2e7f00c.js');
require('next-routes');
require('next/head');

var extractFragmentName = (function (fragment) {
  var pattern = /fragment (.*) on/;
  if (typeof fragment === 'string') return fragment.match(pattern)[1];

  if (fragment && fragment.kind && fragment.kind === 'Document') {
    return fragment.loc.source.body.match(pattern)[1];
  }

  return null;
});

var extractFragmentData = (function (_ref) {
  var fragment = _ref.fragment;
  var spreadFragmentName = '';
  var processedFragment = '';

  if (fragment) {
    var fragmentName = extractFragmentName(fragment);
    if (!fragmentName) throw new Error('Unable to extract a fragment name.');
    processedFragment = fragment;
    spreadFragmentName = "...".concat(fragmentName);
  }

  return {
    processedFragment: processedFragment,
    spreadFragmentName: spreadFragmentName
  };
});

var doc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WithPlatformContentFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"teaser"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"body"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"redirectTo"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seoTitle"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seoDescription"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"fields"},"value":{"kind":"Variable","name":{"kind":"Name","value":"canonicalFields"}}}]}}],"directives":[]}]}}],"loc":{"start":0,"end":189}};
    doc.loc.source = {"body":"fragment WithPlatformContentFragment on PlatformContent {\n  id\n  name\n  type\n  teaser\n  body\n  redirectTo\n  seoTitle\n  seoDescription\n  canonicalPath(input: { fields: $canonicalFields })\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

var withRequestOrigin = (function (Page) {
  var WithRequestOrigin =
  /*#__PURE__*/
  function (_Component) {
    __chunk_4._inherits(WithRequestOrigin, _Component);

    function WithRequestOrigin() {
      __chunk_4._classCallCheck(this, WithRequestOrigin);

      return __chunk_4._possibleConstructorReturn(this, __chunk_4._getPrototypeOf(WithRequestOrigin).apply(this, arguments));
    }

    __chunk_4._createClass(WithRequestOrigin, [{
      key: "render",

      /**
       *
       */
      value: function render() {
        return React__default.createElement(Page, this.props);
      }
    }], [{
      key: "getInitialProps",

      /**
       *
       */
      value: function () {
        var _getInitialProps = __chunk_4._asyncToGenerator(
        /*#__PURE__*/
        __chunk_3._regeneratorRuntime.mark(function _callee(ctx) {
          var pageProps, req, requestOrigin;
          return __chunk_3._regeneratorRuntime.wrap(function _callee$(_context) {
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
                  return _context.abrupt("return", __chunk_4._objectSpread({}, pageProps, {
                    requestOrigin: requestOrigin
                  }));

                case 7:
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

    return WithRequestOrigin;
  }(React.Component);

  WithRequestOrigin.displayName = "WithRequestOrigin(".concat(__chunk_2.displayName(Page), ")");
  WithRequestOrigin.propTypes = __chunk_4._objectSpread({}, Page.propTypes, {
    requestOrigin: PropTypes.string.isRequired
  });
  return WithRequestOrigin;
});

function _templateObject() {
  var data = __chunk_4._taggedTemplateLiteral(["\n    query ContentPage($input: RootPlatformContentQueryOne!, $canonicalFields: [PlatfromContentPathField]!) {\n      platformContent(input: $input) {\n        ...WithPlatformContentFragment\n        ", "\n      }\n    }\n    ", "\n    ", "\n  "]);

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

  var _extractFragmentData = extractFragmentData({
    fragment: fragment
  }),
      spreadFragmentName = _extractFragmentData.spreadFragmentName,
      processedFragment = _extractFragmentData.processedFragment;

  return gql(_templateObject(), spreadFragmentName, doc, processedFragment);
};
/**
 *
 * @param {object} content
 * @param {object} ctx
 * @param {?object} ctx.res
 * @param {string} ctx.asPath
 */

var checkContent = function checkContent(content, _ref2) {
  var res = _ref2.res,
      asPath = _ref2.asPath;
  var redirectTo = content.redirectTo,
      canonicalPath = content.canonicalPath;

  if (redirectTo) {
    routing.redirect(res, redirectTo);
  } else if (canonicalPath !== asPath) {
    routing.redirect(res, canonicalPath);
  }
};
/**
 *
 * @param {object} Page
 * @param {object} options
 * @param {?string|object} options.fragment
 */

var withPlatformContent = (function (Page) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    fragment: null,
    canonicalFields: ['sectionAlias', 'type', 'id', 'slug']
  };

  var WithPlatformContent =
  /*#__PURE__*/
  function (_Component) {
    __chunk_4._inherits(WithPlatformContent, _Component);

    function WithPlatformContent() {
      __chunk_4._classCallCheck(this, WithPlatformContent);

      return __chunk_4._possibleConstructorReturn(this, __chunk_4._getPrototypeOf(WithPlatformContent).apply(this, arguments));
    }

    __chunk_4._createClass(WithPlatformContent, [{
      key: "render",

      /**
       *
       */
      value: function render() {
        var _this$props = this.props,
            requestOrigin = _this$props.requestOrigin,
            canonicalPath = _this$props.canonicalPath,
            content = _this$props.content;
        return React__default.createElement(React__default.Fragment, null, React__default.createElement(__chunk_5.Meta.Title, {
          value: content.seoTitle
        }), React__default.createElement(__chunk_5.Meta.Description, {
          value: content.seoDescription
        }), React__default.createElement(__chunk_5.RelCanonical, {
          origin: requestOrigin,
          pathname: canonicalPath
        }), React__default.createElement(Page, this.props));
      }
    }], [{
      key: "getInitialProps",

      /**
       *
       */
      value: function () {
        var _getInitialProps = __chunk_4._asyncToGenerator(
        /*#__PURE__*/
        __chunk_3._regeneratorRuntime.mark(function _callee(ctx) {
          var pageProps, fragment, canonicalFields, query, apollo, id, input, variables, _ref3, data, platformContent, canonicalPath;

          return __chunk_3._regeneratorRuntime.wrap(function _callee$(_context) {
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

                  id = query.id;

                  if (id) {
                    _context.next = 9;
                    break;
                  }

                  throw __chunk_2.httpErrors.notFound('No content ID was provided.');

                case 9:
                  // Query for the content object using the id, via the inject apollo client.
                  input = {
                    id: Number(id)
                  }; // Pass the canonical args to generate the content's canonical (route) path.

                  variables = {
                    input: input,
                    canonicalFields: canonicalFields
                  };
                  _context.next = 13;
                  return apollo.query({
                    query: buildQuery({
                      fragment: fragment
                    }),
                    variables: variables
                  });

                case 13:
                  _ref3 = _context.sent;
                  data = _ref3.data;
                  platformContent = data.platformContent;

                  if (platformContent) {
                    _context.next = 18;
                    break;
                  }

                  throw __chunk_2.httpErrors.notFound("No content was found for id '".concat(id, "'"));

                case 18:
                  // Check content for internal/external redirects, etc.
                  checkContent(platformContent, ctx);
                  canonicalPath = platformContent.canonicalPath; // @todo TextAds and Promotions can use an external URL. We _must_ account for this
                  // when using the `next-routes::Link` component, as external URLs do not inherently
                  // work.

                  return _context.abrupt("return", __chunk_4._objectSpread({
                    content: platformContent,
                    canonicalPath: canonicalPath
                  }, pageProps));

                case 21:
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
  }(React.Component);

  WithPlatformContent.displayName = "WithPlatformContent(".concat(__chunk_2.displayName(Page), ")");
  WithPlatformContent.propTypes = __chunk_4._objectSpread({}, Page.propTypes, {
    canonicalPath: PropTypes.string.isRequired,
    content: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      teaser: PropTypes.string,
      body: PropTypes.string,
      redirectTo: PropTypes.string,
      seoTitle: PropTypes.string,
      seoDescription: PropTypes.string,
      canonicalPath: PropTypes.string.isRequired
    }).isRequired
  });
  return withRequestOrigin(WithPlatformContent);
});

var doc$1 = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WithWebsiteSectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WebsiteSection"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"description"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"seoTitle"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alias"},"arguments":[],"directives":[]}]}}],"loc":{"start":0,"end":103}};
    doc$1.loc.source = {"body":"fragment WithWebsiteSectionFragment on WebsiteSection {\n  id\n  name\n  description\n  seoTitle\n  alias\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

function _templateObject$1() {
  var data = __chunk_4._taggedTemplateLiteral(["\n    query WithWebsiteSection($input: WebsiteSectionAliasQueryInput!) {\n      websiteSectionAlias(input: $input) {\n        ...WithWebsiteSectionFragment\n        ", "\n      }\n      websiteSectionRedirect(input: $input) {\n        id\n        alias\n      }\n    }\n    ", "\n    ", "\n  "]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * Builds the website section GraphQL query.
 */

var buildQuery$1 = function buildQuery(_ref) {
  var fragment = _ref.fragment;

  var _extractFragmentData = extractFragmentData({
    fragment: fragment
  }),
      spreadFragmentName = _extractFragmentData.spreadFragmentName,
      processedFragment = _extractFragmentData.processedFragment;

  return gql(_templateObject$1(), spreadFragmentName, doc$1, processedFragment);
};
var withWebsiteSection = (function (Page) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    routePrefix: 'section',
    fragment: null
  };

  var WithWebsiteSection =
  /*#__PURE__*/
  function (_Component) {
    __chunk_4._inherits(WithWebsiteSection, _Component);

    function WithWebsiteSection() {
      __chunk_4._classCallCheck(this, WithWebsiteSection);

      return __chunk_4._possibleConstructorReturn(this, __chunk_4._getPrototypeOf(WithWebsiteSection).apply(this, arguments));
    }

    __chunk_4._createClass(WithWebsiteSection, [{
      key: "render",

      /**
       *
       */
      value: function render() {
        var _this$props = this.props,
            requestOrigin = _this$props.requestOrigin,
            canonicalPath = _this$props.canonicalPath,
            section = _this$props.section;
        return React__default.createElement(React__default.Fragment, null, React__default.createElement(__chunk_5.Meta.Title, {
          value: section.seoTitle
        }), React__default.createElement(__chunk_5.Meta.Description, {
          value: section.description
        }), React__default.createElement(__chunk_5.RelCanonical, {
          origin: requestOrigin,
          pathname: canonicalPath
        }), React__default.createElement(Page, this.props));
      }
    }], [{
      key: "getInitialProps",

      /**
       *
       */
      value: function () {
        var _getInitialProps = __chunk_4._asyncToGenerator(
        /*#__PURE__*/
        __chunk_3._regeneratorRuntime.mark(function _callee(ctx) {
          var pageProps, fragment, routePrefix, query, apollo, res, alias, input, variables, _ref2, data, websiteSectionAlias, websiteSectionRedirect, canonicalPath, redirectAlias, path;

          return __chunk_3._regeneratorRuntime.wrap(function _callee$(_context) {
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
                  fragment = options.fragment, routePrefix = options.routePrefix;
                  query = ctx.query, apollo = ctx.apollo, res = ctx.res; // Get the section alias from the page query.
                  // Note: the section alias is required for this HOC to function properly.

                  alias = query.alias;

                  if (alias) {
                    _context.next = 9;
                    break;
                  }

                  throw __chunk_2.httpErrors.notFound('No website section alias was provided.');

                case 9:
                  // Query for the website section using the alias, via the injected apollo client.
                  input = {
                    alias: alias
                  };
                  variables = {
                    input: input
                  };
                  _context.next = 13;
                  return apollo.query({
                    query: buildQuery$1({
                      fragment: fragment
                    }),
                    variables: variables
                  });

                case 13:
                  _ref2 = _context.sent;
                  data = _ref2.data;
                  websiteSectionAlias = data.websiteSectionAlias, websiteSectionRedirect = data.websiteSectionRedirect;

                  if (!websiteSectionAlias) {
                    _context.next = 19;
                    break;
                  }

                  // The website section was found. Return it allong with the page props.
                  canonicalPath = __chunk_2.sectionPath(alias, routePrefix);
                  return _context.abrupt("return", __chunk_4._objectSpread({
                    section: websiteSectionAlias,
                    canonicalPath: canonicalPath
                  }, pageProps));

                case 19:
                  if (!(websiteSectionRedirect && websiteSectionRedirect.alias)) {
                    _context.next = 24;
                    break;
                  }

                  // A redirect was found for this section alias. Force a redirect.
                  redirectAlias = websiteSectionRedirect.alias;
                  path = __chunk_2.sectionPath(redirectAlias, routePrefix);
                  routing.redirect(res, path);
                  return _context.abrupt("return", __chunk_4._objectSpread({
                    section: {},
                    canonicalPath: path
                  }, pageProps));

                case 24:
                  throw __chunk_2.httpErrors.notFound("No website section was found for alias '".concat(alias, "'"));

                case 25:
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

    return WithWebsiteSection;
  }(React.Component);

  WithWebsiteSection.displayName = "WithWebsiteSection(".concat(__chunk_2.displayName(Page), ")");
  WithWebsiteSection.propTypes = __chunk_4._objectSpread({}, Page.propTypes, {
    canonicalPath: PropTypes.string.isRequired,
    section: PropTypes.shape({
      id: PropTypes.number.isRequired,
      alias: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      seoTitle: PropTypes.string
    }).isRequired
  });
  return withRequestOrigin(WithWebsiteSection);
});

exports.withPlatformContent = withPlatformContent;
exports.withRequestOrigin = withRequestOrigin;
exports.withWebsiteSection = withWebsiteSection;
