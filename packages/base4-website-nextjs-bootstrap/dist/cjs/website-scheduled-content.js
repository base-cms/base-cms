'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-2c19305a.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var gql = _interopDefault(require('graphql-tag'));
var queries = require('@base-cms/base4-website-nextjs/queries');
var __chunk_4 = require('./chunk-90a4af32.js');
var __chunk_3 = require('./chunk-67b7e6d5.js');
require('classnames');
require('@base-cms/base4-website-nextjs/components/content');
require('@base-cms/base4-website-nextjs/utils');
require('./chunk-69819099.js');

function _templateObject() {
  var data = __chunk_1._taggedTemplateLiteral(["\n  fragment ContentBlockHeroStyleA on PlatformContent {\n    ...ContentListGroupItemStyleA\n    ...ContentCardBodyStyleA\n  }\n  ", "\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var fragment = gql(_templateObject(), __chunk_3.CardBodyStyleA.fragments.content, __chunk_3.ListGroupStyleA.fragments.content);
var propTypes = {
  // @todo These should be placed here by a HOC.
  query: PropTypes.shape({
    after: PropTypes.string,
    children: PropTypes.func,
    excludeContentIds: PropTypes.arrayOf(PropTypes.string),
    excludeContentTypes: PropTypes.arrayOf(PropTypes.string),
    first: PropTypes.number,
    includeContentTypes: PropTypes.arrayOf(PropTypes.string),
    requiresImage: PropTypes.bool,
    sectionBubbling: PropTypes.bool,
    sectionId: PropTypes.number.isRequired
  })
};
var defaultProps = {
  query: {}
};

var BlockHeroA = function BlockHeroA(_ref) {
  var query = _ref.query,
      attrs = __chunk_1._objectWithoutProperties(_ref, ["query"]);

  var props = __chunk_1._objectSpread({}, query, {
    fragment: fragment
  });

  return React__default.createElement(queries.WebsiteScheduledContent, props, function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React__default.createElement("span", null, "Loading...");

    if (error) {
      return React__default.createElement("span", null, "Error", ' ', error.message);
    }

    var content$$1 = items[0] || {};
    var nodes = items.slice(1) || [];
    return React__default.createElement("div", {
      className: "row"
    }, React__default.createElement("div", {
      className: "col-lg-7 col-xl-8"
    }, React__default.createElement(__chunk_4.Card, null, React__default.createElement(__chunk_3.CardBodyStyleA, __chunk_1._extends({
      content: content$$1
    }, attrs)))), React__default.createElement("div", {
      className: "col-lg-5 col-xl-4"
    }, React__default.createElement(__chunk_3.ListGroupStyleA, __chunk_1._extends({
      nodes: nodes
    }, attrs))));
  });
};

BlockHeroA.displayName = 'WebsiteScheduledContent/Blocks/HeroA';
BlockHeroA.propTypes = propTypes;
BlockHeroA.defaultProps = defaultProps;

var propTypes$1 = {
  // @todo These should be placed here by a HOC.
  query: PropTypes.shape({
    after: PropTypes.string,
    children: PropTypes.func,
    excludeContentIds: PropTypes.arrayOf(PropTypes.string),
    excludeContentTypes: PropTypes.arrayOf(PropTypes.string),
    first: PropTypes.number,
    includeContentTypes: PropTypes.arrayOf(PropTypes.string),
    requiresImage: PropTypes.bool,
    sectionBubbling: PropTypes.bool,
    sectionId: PropTypes.number.isRequired
  })
};
var defaultProps$1 = {
  query: {}
};

var BlockListGroupA = function BlockListGroupA(_ref) {
  var query = _ref.query,
      attrs = __chunk_1._objectWithoutProperties(_ref, ["query"]);

  var fragment = __chunk_3.ListGroupStyleA.fragments.content;

  var props = __chunk_1._objectSpread({}, query, {
    fragment: fragment
  });

  return React__default.createElement(queries.WebsiteScheduledContent, props, function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React__default.createElement("span", null, "Loading...");

    if (error) {
      return React__default.createElement("span", null, "Error", ' ', error.message);
    }

    return React__default.createElement(__chunk_3.ListGroupStyleA, __chunk_1._extends({
      nodes: items
    }, attrs));
  });
};

BlockListGroupA.displayName = 'WebsiteScheduledContent/Blocks/ListGroupA';
BlockListGroupA.propTypes = propTypes$1;
BlockListGroupA.defaultProps = defaultProps$1;

exports.BlockHeroA = BlockHeroA;
exports.BlockListGroupA = BlockListGroupA;
