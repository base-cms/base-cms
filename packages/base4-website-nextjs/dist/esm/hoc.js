import { a as _regeneratorRuntime } from './chunk-fd635e66.js';
import { g as _objectSpread, a as _asyncToGenerator, b as _classCallCheck, c as _createClass, d as _possibleConstructorReturn, e as _getPrototypeOf, f as _inherits, h as _taggedTemplateLiteral } from './chunk-38cf2b6d.js';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { a as displayName, b as httpErrors } from './chunk-0fb8a91e.js';
import gql from 'graphql-tag';
import { redirect } from './routing.js';
import { a as RelCanonical } from './chunk-c2a2fd6b.js';
import 'next-routes';
import 'next/head';
import './chunk-5198f64a.js';

var withRequestOrigin = (function (Page) {
  var WithRequestOrigin =
  /*#__PURE__*/
  function (_Component) {
    _inherits(WithRequestOrigin, _Component);

    function WithRequestOrigin() {
      _classCallCheck(this, WithRequestOrigin);

      return _possibleConstructorReturn(this, _getPrototypeOf(WithRequestOrigin).apply(this, arguments));
    }

    _createClass(WithRequestOrigin, [{
      key: "render",

      /**
       *
       */
      value: function render() {
        return React.createElement(Page, this.props);
      }
    }], [{
      key: "getInitialProps",

      /**
       *
       */
      value: function () {
        var _getInitialProps = _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee(ctx) {
          var pageProps, req, requestOrigin;
          return _regeneratorRuntime.wrap(function _callee$(_context) {
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
                  return _context.abrupt("return", _objectSpread({}, pageProps, {
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
  }(Component);

  WithRequestOrigin.displayName = "WithRequestOrigin(".concat(displayName(Page), ")");
  WithRequestOrigin.propTypes = _objectSpread({}, Page.propTypes, {
    requestOrigin: PropTypes.string.isRequired
  });
  return WithRequestOrigin;
});

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

var doc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WithPlatformContentFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"teaser"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"body"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"redirectTo"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"fields"},"value":{"kind":"Variable","name":{"kind":"Name","value":"canonicalFields"}}}]}}],"directives":[]}]}}],"loc":{"start":0,"end":161}};
    doc.loc.source = {"body":"fragment WithPlatformContentFragment on PlatformContent {\n  id\n  name\n  type\n  teaser\n  body\n  redirectTo\n  canonicalPath(input: { fields: $canonicalFields })\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    query ContentPage($input: RootPlatformContentQueryOne!, $canonicalFields: [PlatfromContentPathField]!) {\n      platformContent(input: $input) {\n        ...WithPlatformContentFragment\n        ", "\n      }\n    }\n    ", "\n    ", "\n  "]);

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
    redirect(res, redirectTo);
  } else if (canonicalPath !== asPath) {
    redirect(res, canonicalPath);
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
        return React.createElement(React.Fragment, null, React.createElement(RelCanonical, {
          origin: requestOrigin,
          pathname: canonicalPath
        }), React.createElement(Page, this.props));
      }
    }], [{
      key: "getInitialProps",

      /**
       *
       */
      value: function () {
        var _getInitialProps = _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee(ctx) {
          var pageProps, fragment, canonicalFields, query, apollo, id, input, variables, _ref3, data, platformContent, canonicalPath;

          return _regeneratorRuntime.wrap(function _callee$(_context) {
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

                  throw httpErrors.notFound("No content was found for id '".concat(id, "'"));

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
  }(Component);

  WithPlatformContent.displayName = "WithPlatformContent(".concat(displayName(Page), ")");
  WithPlatformContent.propTypes = _objectSpread({}, Page.propTypes, {
    canonicalPath: PropTypes.string.isRequired,
    content: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      teaser: PropTypes.string,
      body: PropTypes.string,
      redirectTo: PropTypes.string,
      canonicalPath: PropTypes.string.isRequired
    }).isRequired
  });
  return withRequestOrigin(WithPlatformContent);
});

export { withRequestOrigin, withPlatformContent };
