'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-1c32c684.js');
var React = _interopDefault(require('react'));
var PropTypes = _interopDefault(require('prop-types'));
var classNames = _interopDefault(require('classnames'));
var gql = _interopDefault(require('graphql-tag'));
var content = require('@base-cms/base4-website-nextjs/components/content');
var utils = require('@base-cms/base4-website-nextjs/utils');

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
      content$$1 = _ref.content,
      attr = __chunk_1._objectWithoutProperties(_ref, ["children", "className", "content"]);

  var _ref2 = content$$1 || {},
      id = _ref2.id,
      type = _ref2.type;

  return id && type ? React.createElement(__chunk_1.ListGroupItem, __chunk_1._extends({
    "data-id": id,
    className: classNames('content', 'content--list-item', "content--".concat(type), className)
  }, attr), children) : null;
};

ContentListGroupItem.displayName = 'Content/ListGroupItem';
ContentListGroupItem.propTypes = propTypes;
ContentListGroupItem.defaultProps = defaultProps;

function _templateObject() {
  var data = __chunk_1._taggedTemplateLiteral(["\n    fragment ContentListGroupItemStyleA on PlatformContent {\n      id\n      type\n      shortName\n      published\n      canonicalPath\n      primarySection {\n        id\n        name\n        alias\n      }\n      ... on PlatformContentProduct {\n        company {\n          id\n          name\n          canonicalPath\n        }\n      }\n    }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
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
  var content$$1 = _ref.content,
      attr = __chunk_1._objectWithoutProperties(_ref, ["content"]);

  return React.createElement(ContentListGroupItem, __chunk_1._extends({
    content: content$$1
  }, attr), React.createElement(content.ShortNameLink, {
    content: content$$1,
    className: "mb-1"
  }), React.createElement(content.Row, {
    tag: "small"
  }, React.createElement(content.PrimarySectionNameLink, {
    content: content$$1,
    className: "mr-2"
  }), React.createElement(content.PublishedDate, {
    content: content$$1
  })));
}; // @todo determine how to pass canonical field args...
// canonicalPath(input: { fields: $canonicalFields })


ListGroupItemStyleA.displayName = 'Content/ListGroupItem/StyleA';
ListGroupItemStyleA.propTypes = propTypes$1;
ListGroupItemStyleA.defaultProps = defaultProps$1;
ListGroupItemStyleA.fragments = {
  content: gql(_templateObject())
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
      attrs = __chunk_1._objectWithoutProperties(_ref, ["itemAttrs", "nodes"]);

  var items = utils.asArray(nodes);
  return items.length ? React.createElement(__chunk_1.ListGroup, attrs, items.map(function (content$$1) {
    return React.createElement(ListGroupItemStyleA, __chunk_1._extends({
      key: content$$1.id,
      content: content$$1
    }, itemAttrs));
  })) : null;
};

ListGroupStyleA.displayName = 'Content/ListGroup/StyleA';
ListGroupStyleA.propTypes = propTypes$2;
ListGroupStyleA.defaultProps = defaultProps$2;
ListGroupStyleA.fragments = {
  content: ListGroupItemStyleA.fragments.content
};

exports.ListGroupStyleA = ListGroupStyleA;
exports.ListGroupItem = ContentListGroupItem;
exports.ListGroupItemA = ListGroupItemStyleA;
