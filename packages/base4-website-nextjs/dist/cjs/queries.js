'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_2 = require('./chunk-2c19305a.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var reactApollo = require('react-apollo');
var gql = _interopDefault(require('graphql-tag'));
var utils = require('./utils.js');

function _templateObject() {
  var data = __chunk_2._taggedTemplateLiteral(["\n    query WebsiteScheduledContent($input: WebsiteScheduledPlatformContentQuery!) {\n      websiteScheduledPlatformContent(input: $input) {\n        edges {\n          node {\n            id\n            ", "\n          }\n        }\n      }\n    }\n    ", "\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var buildQuery = function buildQuery(_ref) {
  var fragment = _ref.fragment;

  var _extractFragmentData = utils.extractFragmentData({
    fragment: fragment
  }),
      spreadFragmentName = _extractFragmentData.spreadFragmentName,
      processedFragment = _extractFragmentData.processedFragment;

  return gql(_templateObject(), spreadFragmentName, processedFragment);
};
/**
 *
 */

var WebsiteScheduledContent = function WebsiteScheduledContent(_ref2) {
  var after = _ref2.after,
      children = _ref2.children,
      excludeContentIds = _ref2.excludeContentIds,
      excludeContentTypes = _ref2.excludeContentTypes,
      first = _ref2.first,
      fragment = _ref2.fragment,
      includeContentTypes = _ref2.includeContentTypes,
      requiresImage = _ref2.requiresImage,
      sectionBubbling = _ref2.sectionBubbling,
      sectionId = _ref2.sectionId;
  var pagination = {
    first: first,
    after: after
  };
  var input = {
    pagination: pagination,
    excludeContentIds: excludeContentIds,
    excludeContentTypes: excludeContentTypes,
    includeContentTypes: includeContentTypes,
    requiresImage: requiresImage,
    sectionBubbling: sectionBubbling,
    sectionId: sectionId
  };
  var query = buildQuery({
    fragment: fragment
  });
  return React__default.createElement(reactApollo.Query, {
    query: query,
    variables: {
      input: input
    }
  }, function (_ref3) {
    var loading = _ref3.loading,
        error = _ref3.error,
        data = _ref3.data;
    var items = [];

    if (data && data.websiteScheduledPlatformContent) {
      items = data.websiteScheduledPlatformContent.edges.map(function (edge) {
        return edge && edge.node ? edge.node : null;
      }).filter(function (c) {
        return c;
      });
    }

    return children({
      loading: loading,
      error: error,
      items: items
    });
  });
};

WebsiteScheduledContent.defaultProps = {
  after: null,
  children: function children() {},
  excludeContentIds: [],
  excludeContentTypes: [],
  first: 5,
  fragment: undefined,
  includeContentTypes: [],
  requiresImage: false,
  sectionBubbling: true
};
WebsiteScheduledContent.propTypes = {
  after: PropTypes.string,
  children: PropTypes.func,
  excludeContentIds: PropTypes.arrayOf(PropTypes.string),
  excludeContentTypes: PropTypes.arrayOf(PropTypes.string),
  fragment: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  first: PropTypes.number,
  includeContentTypes: PropTypes.arrayOf(PropTypes.string),
  requiresImage: PropTypes.bool,
  sectionBubbling: PropTypes.bool,
  sectionId: PropTypes.number.isRequired
};

exports.WebsiteScheduledContent = WebsiteScheduledContent;
