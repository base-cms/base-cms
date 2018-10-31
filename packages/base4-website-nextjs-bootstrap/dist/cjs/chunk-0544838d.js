'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var content = require('@base-cms/base4-website-nextjs/components/content');
var __chunk_3 = require('./chunk-aadbd80c.js');
var __chunk_1 = require('./chunk-3874e52a.js');
var utils = require('@base-cms/base4-website-nextjs/utils');

var doc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentListGroupItemStyleA"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"shortName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"published"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"primarySection"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alias"},"arguments":[],"directives":[]}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContentProduct"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]}]}}]}}]}}],"loc":{"start":0,"end":258}};
    doc.loc.source = {"body":"fragment ContentListGroupItemStyleA on PlatformContent {\n  id\n  type\n  shortName\n  published\n  canonicalPath\n  primarySection {\n    id\n    name\n    alias\n  }\n  ... on PlatformContentProduct {\n    company {\n      id\n      name\n      canonicalPath\n    }\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

var propTypes = {
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
var defaultProps = {
  content: {}
};

var ListGroupItemStyleA = function ListGroupItemStyleA(_ref) {
  var content$$1 = _ref.content;
  return React__default.createElement(__chunk_3.ListGroupItem, null, React__default.createElement(content.ShortNameLink, {
    content: content$$1,
    className: "mb-1"
  }), React__default.createElement(content.CompanyNameLink, {
    content: content$$1,
    tag: "small",
    className: "d-block",
    prefix: "From "
  }), React__default.createElement(content.Row, {
    tag: "small"
  }, React__default.createElement(content.PrimarySectionNameLink, {
    content: content$$1,
    className: "mr-2"
  }), React__default.createElement(content.PublishedDate, {
    content: content$$1
  })));
};

ListGroupItemStyleA.displayName = 'Content/ListGroupItem/StyleA';
ListGroupItemStyleA.propTypes = propTypes;
ListGroupItemStyleA.defaultProps = defaultProps;
ListGroupItemStyleA.fragments = {
  content: doc
};
var ListGroupItemA = withAttributes('list-item')(ListGroupItemStyleA);

var propTypes$1 = {
  flush: PropTypes.bool,
  itemAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  nodes: PropTypes.arrayOf(PropTypes.object)
};
var defaultProps$1 = {
  flush: false,
  itemAttrs: {},
  nodes: []
};

var ListGroupStyleA = function ListGroupStyleA(_ref) {
  var itemAttrs = _ref.itemAttrs,
      nodes = _ref.nodes,
      attrs = __chunk_1._objectWithoutProperties(_ref, ["itemAttrs", "nodes"]);

  var items = utils.asArray(nodes);
  return items.length ? React__default.createElement(__chunk_3.ListGroup, attrs, items.map(function (content$$1) {
    return React__default.createElement(ListGroupItemA, __chunk_1._extends({
      key: content$$1.id,
      content: content$$1
    }, itemAttrs));
  })) : null;
};

ListGroupStyleA.displayName = 'Content/ListGroup/StyleA';
ListGroupStyleA.propTypes = propTypes$1;
ListGroupStyleA.defaultProps = defaultProps$1;
ListGroupStyleA.fragments = {
  content: ListGroupItemA.fragments.content
};

exports.ListGroupStyleA = ListGroupStyleA;
exports.ListGroupItemA = ListGroupItemA;
