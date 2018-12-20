import { k as _taggedTemplateLiteral } from './chunk-cc870ac4.js';
import React from 'react';
import { extractFragmentData } from './utils.js';
import 'inflected';
import 'escape-string-regexp';
import 'moment';
import 'object-path';
import 'next/config';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

var _jsxFileName = "/base-cms/packages/nextjs-web/src/queries/WebsiteScheduledContent.jsx";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    query WebsiteScheduledContent($input: WebsiteScheduledContentQueryInput!) {\n      websiteScheduledContent(input: $input) {\n        edges {\n          node {\n            id\n            ", "\n          }\n        }\n      }\n    }\n    ", "\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var buildQuery = function buildQuery(_ref) {
  var fragment = _ref.fragment;

  var _extractFragmentData = extractFragmentData({
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
      limit = _ref2.limit,
      fragment = _ref2.fragment,
      includeContentTypes = _ref2.includeContentTypes,
      requiresImage = _ref2.requiresImage,
      sectionBubbling = _ref2.sectionBubbling,
      sectionId = _ref2.sectionId,
      optionId = _ref2.optionId;
  var pagination = {
    limit: limit,
    after: after
  };
  var input = {
    pagination: pagination,
    excludeContentIds: excludeContentIds,
    excludeContentTypes: excludeContentTypes,
    includeContentTypes: includeContentTypes,
    requiresImage: requiresImage,
    sectionBubbling: sectionBubbling,
    sectionId: sectionId,
    optionId: optionId
  };
  var query = buildQuery({
    fragment: fragment
  });
  return React.createElement(Query, {
    query: query,
    variables: {
      input: input
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  }, function (_ref3) {
    var loading = _ref3.loading,
        error = _ref3.error,
        data = _ref3.data;
    var items = [];

    if (data && data.websiteScheduledContent) {
      items = data.websiteScheduledContent.edges.map(function (edge) {
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
  limit: 5,
  fragment: undefined,
  includeContentTypes: [],
  requiresImage: false,
  sectionBubbling: true,
  optionId: undefined
};
WebsiteScheduledContent.propTypes = {
  after: PropTypes.string,
  children: PropTypes.func,
  excludeContentIds: PropTypes.arrayOf(PropTypes.string),
  excludeContentTypes: PropTypes.arrayOf(PropTypes.string),
  fragment: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  limit: PropTypes.number,
  includeContentTypes: PropTypes.arrayOf(PropTypes.string),
  requiresImage: PropTypes.bool,
  sectionBubbling: PropTypes.bool,
  sectionId: PropTypes.number.isRequired,
  optionId: PropTypes.number
};

export { WebsiteScheduledContent };
