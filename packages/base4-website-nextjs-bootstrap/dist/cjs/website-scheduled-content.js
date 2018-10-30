'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-3874e52a.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var queries = require('@base-cms/base4-website-nextjs/queries');
var __chunk_3 = require('./chunk-4790ccf4.js');
require('classnames');
require('./chunk-ec0103f6.js');
require('@base-cms/base4-website-nextjs/components/content');
require('@base-cms/base4-website-nextjs/utils');

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
BlockListGroupA.propTypes = propTypes;
BlockListGroupA.defaultProps = defaultProps;

exports.BlockListGroupA = BlockListGroupA;
