import { a as _extends, f as _objectSpread, b as _objectWithoutProperties } from './chunk-3eb334fd.js';
import React from 'react';
import PropTypes from 'prop-types';
import { WebsiteScheduledContent } from '@base-cms/base4-website-nextjs/queries';
import { a as ListGroupStyleA } from './chunk-92bff19c.js';
import 'classnames';
import 'graphql-tag';
import '@base-cms/base4-website-nextjs/components/content';
import '@base-cms/base4-website-nextjs/utils';

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
      attrs = _objectWithoutProperties(_ref, ["query"]);

  var fragment = ListGroupStyleA.fragments.content;

  var props = _objectSpread({}, query, {
    fragment: fragment
  });

  return React.createElement(WebsiteScheduledContent, props, function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React.createElement("span", null, "Loading...");

    if (error) {
      return React.createElement("span", null, "Error", ' ', error.message);
    }

    return React.createElement(ListGroupStyleA, _extends({
      nodes: items
    }, attrs));
  });
};

BlockListGroupA.displayName = 'WebsiteScheduledContent/Blocks/ListGroupA';
BlockListGroupA.propTypes = propTypes;
BlockListGroupA.defaultProps = defaultProps;

export { BlockListGroupA };
