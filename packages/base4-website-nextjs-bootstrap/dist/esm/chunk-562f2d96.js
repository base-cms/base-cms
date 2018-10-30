import { a as _extends, b as _objectWithoutProperties, c as ListGroupItem, d as ListGroup } from './chunk-e66bd223.js';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CompanyNameLink, PrimarySectionNameLink, PublishedDate, Row, ShortNameLink } from '@base-cms/base4-website-nextjs/components/content';
import { asArray } from '@base-cms/base4-website-nextjs/utils';

var propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  content: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string
  })
};
var defaultProps = {
  className: null,
  content: {}
};

var ContentListGroupItem = function ContentListGroupItem(_ref) {
  var children = _ref.children,
      className = _ref.className,
      content = _ref.content,
      attr = _objectWithoutProperties(_ref, ["children", "className", "content"]);

  var _ref2 = content || {},
      id = _ref2.id,
      type = _ref2.type;

  return id && type ? React.createElement(ListGroupItem, _extends({
    "data-id": id,
    className: classNames('content', 'content--list-item', "content--".concat(type), className)
  }, attr), children) : null;
};

ContentListGroupItem.displayName = 'Content/ListGroupItem';
ContentListGroupItem.propTypes = propTypes;
ContentListGroupItem.defaultProps = defaultProps;

var doc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentListGroupItemStyleA"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"shortName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"published"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"fields"},"value":{"kind":"Variable","name":{"kind":"Name","value":"canonicalFields"}}}]}}],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"primarySection"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alias"},"arguments":[],"directives":[]}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContentProduct"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"fields"},"value":{"kind":"Variable","name":{"kind":"Name","value":"canonicalFields"}}}]}}],"directives":[]}]}}]}}]}}],"loc":{"start":0,"end":332}};
    doc.loc.source = {"body":"fragment ContentListGroupItemStyleA on PlatformContent {\n  id\n  type\n  shortName\n  published\n  canonicalPath(input: { fields: $canonicalFields })\n  primarySection {\n    id\n    name\n    alias\n  }\n  ... on PlatformContentProduct {\n    company {\n      id\n      name\n      canonicalPath(input: { fields: $canonicalFields })\n    }\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

var propTypes$1 = {
  content: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    shortName: PropTypes.string,
    canonicalPath: PropTypes.string,
    published: PropTypes.number,
    company: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      canonicalPath: PropTypes.string
    }),
    primarySection: PropTypes.shape({
      id: PropTypes.number,
      alias: PropTypes.string,
      name: PropTypes.string
    })
  })
};
var defaultProps$1 = {
  content: {}
};

var ListGroupItemStyleA = function ListGroupItemStyleA(_ref) {
  var content = _ref.content,
      attr = _objectWithoutProperties(_ref, ["content"]);

  return React.createElement(ContentListGroupItem, _extends({
    content: content
  }, attr), React.createElement(ShortNameLink, {
    content: content,
    className: "mb-1"
  }), React.createElement(CompanyNameLink, {
    content: content,
    tag: "small",
    className: "d-block",
    prefix: "From "
  }), React.createElement(Row, {
    tag: "small"
  }, React.createElement(PrimarySectionNameLink, {
    content: content,
    className: "mr-2"
  }), React.createElement(PublishedDate, {
    content: content
  })));
};

ListGroupItemStyleA.displayName = 'Content/ListGroupItem/StyleA';
ListGroupItemStyleA.propTypes = propTypes$1;
ListGroupItemStyleA.defaultProps = defaultProps$1;
ListGroupItemStyleA.fragments = {
  content: doc
};

var propTypes$2 = {
  flush: PropTypes.bool,
  itemAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  nodes: PropTypes.arrayOf(PropTypes.object)
};
var defaultProps$2 = {
  flush: false,
  itemAttrs: {},
  nodes: []
};

var ListGroupStyleA = function ListGroupStyleA(_ref) {
  var itemAttrs = _ref.itemAttrs,
      nodes = _ref.nodes,
      attrs = _objectWithoutProperties(_ref, ["itemAttrs", "nodes"]);

  var items = asArray(nodes);
  return items.length ? React.createElement(ListGroup, attrs, items.map(function (content) {
    return React.createElement(ListGroupItemStyleA, _extends({
      key: content.id,
      content: content
    }, itemAttrs));
  })) : null;
};

ListGroupStyleA.displayName = 'Content/ListGroup/StyleA';
ListGroupStyleA.propTypes = propTypes$2;
ListGroupStyleA.defaultProps = defaultProps$2;
ListGroupStyleA.fragments = {
  content: ListGroupItemStyleA.fragments.content
};

export { ListGroupStyleA as a, ContentListGroupItem as b, ListGroupItemStyleA as c };
