import { c as _objectSpread, b as _objectWithoutProperties, j as _taggedTemplateLiteral, a as _extends } from './chunk-cfc9ba70.js';
import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { WebsiteScheduledContent } from '@base-cms/base4-website-nextjs/queries';
import { Card } from './core.js';
import { CardBodyB, ListGroupA, CardBodyA } from './content.js';
import 'classnames';
import 'next/router';
import '@base-cms/base4-website-nextjs/components/core';
import '@base-cms/base4-website-nextjs/utils';
import '@base-cms/base4-website-nextjs/config';
import '@base-cms/base4-website-nextjs/components/content';

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  fragment ContentBlockHeroStyleA on PlatformContent {\n    ...ContentListGroupItemStyleA\n    ...ContentCardBodyStyleB\n  }\n  ", "\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var fragment = gql(_templateObject(), CardBodyB.fragments.content, ListGroupA.fragments.content);
var propTypes = {
  header: PropTypes.string,
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
  header: null,
  query: {}
};

var BlockHeroA = function BlockHeroA(_ref) {
  var header = _ref.header,
      query = _ref.query,
      attrs = _objectWithoutProperties(_ref, ["header", "query"]);

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

    var content = items[0] || {};
    var nodes = items.slice(1) || [];
    return React.createElement(Card, attrs, header && React.createElement("div", {
      className: "card-header"
    }, header), React.createElement(CardBodyB, {
      content: content
    }), React.createElement(ListGroupA, {
      flush: true,
      nodes: nodes
    }));
  });
};

BlockHeroA.displayName = 'WebsiteScheduledContent/Blocks/CardListGroupA';
BlockHeroA.propTypes = propTypes;
BlockHeroA.defaultProps = defaultProps;

function _templateObject$1() {
  var data = _taggedTemplateLiteral(["\n  fragment ContentBlockHeroStyleA on PlatformContent {\n    ...ContentListGroupItemStyleA\n    ...ContentCardBodyStyleA\n  }\n  ", "\n  ", "\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var fragment$1 = gql(_templateObject$1(), CardBodyA.fragments.content, ListGroupA.fragments.content);
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

var BlockHeroA$1 = function BlockHeroA(_ref) {
  var query = _ref.query,
      attrs = _objectWithoutProperties(_ref, ["query"]);

  var props = _objectSpread({}, query, {
    fragment: fragment$1
  });

  return React.createElement(WebsiteScheduledContent, props, function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React.createElement("span", null, "Loading...");

    if (error) {
      return React.createElement("span", null, "Error", ' ', error.message);
    }

    var content = items[0] || {};
    var nodes = items.slice(1) || [];
    return React.createElement("div", {
      className: "row"
    }, React.createElement("div", {
      className: "col-lg-7 col-xl-8"
    }, React.createElement(Card, null, React.createElement(CardBodyA, _extends({
      content: content
    }, attrs)))), React.createElement("div", {
      className: "col-lg-5 col-xl-4"
    }, React.createElement(ListGroupA, _extends({
      nodes: nodes
    }, attrs))));
  });
};

BlockHeroA$1.displayName = 'WebsiteScheduledContent/Blocks/HeroA';
BlockHeroA$1.propTypes = propTypes$1;
BlockHeroA$1.defaultProps = defaultProps$1;

var fragment$2 = ListGroupA.fragments.content;
var propTypes$2 = {
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
var defaultProps$2 = {
  query: {}
};

var BlockListGroupA = function BlockListGroupA(_ref) {
  var query = _ref.query,
      attrs = _objectWithoutProperties(_ref, ["query"]);

  var props = _objectSpread({}, query, {
    fragment: fragment$2
  });

  return React.createElement(WebsiteScheduledContent, props, function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        items = _ref2.items;
    if (loading) return React.createElement("span", null, "Loading...");

    if (error) {
      return React.createElement("span", null, "Error", ' ', error.message);
    }

    return React.createElement(ListGroupA, _extends({
      nodes: items
    }, attrs));
  });
};

BlockListGroupA.displayName = 'WebsiteScheduledContent/Blocks/ListGroupA';
BlockListGroupA.propTypes = propTypes$2;
BlockListGroupA.defaultProps = defaultProps$2;

export { BlockHeroA as BlockCardListGroupA, BlockHeroA$1 as BlockHeroA, BlockListGroupA };
