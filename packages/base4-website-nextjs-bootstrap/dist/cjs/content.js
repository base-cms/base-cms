'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-2c19305a.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var classNames = _interopDefault(require('classnames'));
var content = require('@base-cms/base4-website-nextjs/components/content');
var utils = require('@base-cms/base4-website-nextjs/utils');
var core = require('./core.js');
require('next/router');
require('@base-cms/base4-website-nextjs/components/core');
require('@base-cms/base4-website-nextjs/config');

var propTypes = {
  className: PropTypes.string,
  content: PropTypes.shape({
    id: PropTypes.number,
    canonicalPath: PropTypes.string,
    primaryImage: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string
    })
  }),
  linkClassName: PropTypes.string,
  withBody: PropTypes.bool
};
var defaultProps = {
  className: null,
  content: {},
  linkClassName: null,
  withBody: false
};

var ContentCardImage = function ContentCardImage(_ref) {
  var className = _ref.className,
      content$$1 = _ref.content,
      linkClassName = _ref.linkClassName,
      withBody = _ref.withBody,
      rest = __chunk_1._objectWithoutProperties(_ref, ["className", "content", "linkClassName", "withBody"]);

  var imgAttrs = {
    className: classNames(withBody ? 'card-img' : 'card-img-top img-fluid embed-responsive-item', className)
  };
  var linkAttrs = {
    className: classNames('embed-responsive', 'embed-responsive-16by9', linkClassName)
  };
  return React__default.createElement(content.PrimaryImageLink, __chunk_1._extends({
    content: content$$1,
    linkAttrs: linkAttrs,
    imgAttrs: imgAttrs
  }, rest));
};

ContentCardImage.displayName = 'Content/CardImage';
ContentCardImage.propTypes = propTypes;
ContentCardImage.defaultProps = defaultProps;

var wrapperAttrs = (function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      modifier = _ref.modifier,
      content$$1 = _ref.content,
      className = _ref.className;

  var id = utils.get(content$$1, 'id');
  var type = utils.get(content$$1, 'type');
  return {
    'data-id': id,
    className: classNames('content', "content--".concat(modifier), "content--".concat(type), className)
  };
});

var doc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentCardBodyStyleA"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"shortName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"teaser"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"published"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"primarySection"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alias"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryImage"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"src"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"host"},"value":{"kind":"StringValue","value":"cdn.officer.com","block":false}}]}}],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alt"},"arguments":[],"directives":[]}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContentProduct"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]}]}}]}}]}}],"loc":{"start":0,"end":378}};
    doc.loc.source = {"body":"fragment ContentCardBodyStyleA on PlatformContent {\n  id\n  type\n  shortName\n  teaser\n  published\n  canonicalPath\n  primarySection {\n    id\n    name\n    alias\n  }\n  # @todo Remove the hardcoded CDN!\n  primaryImage {\n    id\n    src(input: { host: \"cdn.officer.com\" })\n    alt\n  }\n  ... on PlatformContentProduct {\n    company {\n      id\n      name\n      canonicalPath\n    }\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

var propTypes$1 = {
  content: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    teaser: PropTypes.string,
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
    }),
    primaryImage: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string
    })
  }),
  imgAttrs: PropTypes.object // eslint-disable-line react/forbid-prop-types

};
var defaultProps$1 = {
  content: {},
  imgAttrs: {}
};

var CardBodyStyleA = function CardBodyStyleA(_ref) {
  var content$$1 = _ref.content,
      imgAttrs = _ref.imgAttrs,
      attrs = __chunk_1._objectWithoutProperties(_ref, ["content", "imgAttrs"]);

  return React__default.createElement("div", wrapperAttrs({
    modifier: 'card-body',
    content: content$$1
  }), React__default.createElement(ContentCardImage, __chunk_1._extends({
    content: content$$1
  }, imgAttrs)), React__default.createElement(core.CardBody, attrs, React__default.createElement(content.ShortNameLink, {
    content: content$$1,
    tag: "h4"
  }), React__default.createElement(content.CompanyNameLink, {
    content: content$$1,
    tag: "small",
    className: "card-text d-block",
    prefix: "From "
  }), React__default.createElement(content.Teaser, {
    content: content$$1,
    className: "card-text"
  }), React__default.createElement(content.Row, {
    tag: "small",
    className: "card-text"
  }, React__default.createElement(content.PrimarySectionNameLink, {
    content: content$$1,
    className: "mr-2"
  }), React__default.createElement(content.PublishedDate, {
    content: content$$1
  }))));
};

CardBodyStyleA.displayName = 'Content/CardBody/StyleA';
CardBodyStyleA.propTypes = propTypes$1;
CardBodyStyleA.defaultProps = defaultProps$1;
CardBodyStyleA.fragments = {
  content: doc
};

var doc$1 = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentCardBodyStyleB"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"shortName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"published"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"primarySection"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alias"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryImage"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"src"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"host"},"value":{"kind":"StringValue","value":"cdn.officer.com","block":false}}]}}],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alt"},"arguments":[],"directives":[]}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContentProduct"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]}]}}]}}]}}],"loc":{"start":0,"end":369}};
    doc$1.loc.source = {"body":"fragment ContentCardBodyStyleB on PlatformContent {\n  id\n  type\n  shortName\n  published\n  canonicalPath\n  primarySection {\n    id\n    name\n    alias\n  }\n  # @todo Remove the hardcoded CDN!\n  primaryImage {\n    id\n    src(input: { host: \"cdn.officer.com\" })\n    alt\n  }\n  ... on PlatformContentProduct {\n    company {\n      id\n      name\n      canonicalPath\n    }\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

var propTypes$2 = {
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
    }),
    primaryImage: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string
    })
  }),
  imgAttrs: PropTypes.object // eslint-disable-line react/forbid-prop-types

};
var defaultProps$2 = {
  content: {},
  imgAttrs: {}
};

var CardBodyStyleB = function CardBodyStyleB(_ref) {
  var content$$1 = _ref.content,
      imgAttrs = _ref.imgAttrs,
      attrs = __chunk_1._objectWithoutProperties(_ref, ["content", "imgAttrs"]);

  return React__default.createElement("div", wrapperAttrs({
    modifier: 'card-body',
    content: content$$1
  }), React__default.createElement(ContentCardImage, __chunk_1._extends({
    content: content$$1
  }, imgAttrs)), React__default.createElement(core.CardBody, attrs, React__default.createElement(content.ShortNameLink, {
    content: content$$1,
    tag: "h4"
  }), React__default.createElement(content.CompanyNameLink, {
    content: content$$1,
    tag: "small",
    className: "card-text d-block",
    prefix: "From "
  }), React__default.createElement(content.Row, {
    tag: "small",
    className: "card-text"
  }, React__default.createElement(content.PrimarySectionNameLink, {
    content: content$$1,
    className: "mr-2"
  }), React__default.createElement(content.PublishedDate, {
    content: content$$1
  }))));
};

CardBodyStyleB.displayName = 'Content/CardBody/StyleB';
CardBodyStyleB.propTypes = propTypes$2;
CardBodyStyleB.defaultProps = defaultProps$2;
CardBodyStyleB.fragments = {
  content: doc$1
};

var doc$2 = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentListGroupItemStyleA"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"shortName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"published"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"primarySection"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alias"},"arguments":[],"directives":[]}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContentProduct"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]}]}}]}}]}}],"loc":{"start":0,"end":258}};
    doc$2.loc.source = {"body":"fragment ContentListGroupItemStyleA on PlatformContent {\n  id\n  type\n  shortName\n  published\n  canonicalPath\n  primarySection {\n    id\n    name\n    alias\n  }\n  ... on PlatformContentProduct {\n    company {\n      id\n      name\n      canonicalPath\n    }\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

var propTypes$3 = {
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
var defaultProps$3 = {
  content: {}
};

var ListGroupItemStyleA = function ListGroupItemStyleA(_ref) {
  var content$$1 = _ref.content;
  return React__default.createElement(core.ListGroupItem, wrapperAttrs({
    modifier: 'list-item',
    content: content$$1
  }), React__default.createElement(content.ShortNameLink, {
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
ListGroupItemStyleA.propTypes = propTypes$3;
ListGroupItemStyleA.defaultProps = defaultProps$3;
ListGroupItemStyleA.fragments = {
  content: doc$2
};

var propTypes$4 = {
  flush: PropTypes.bool,
  itemAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  nodes: PropTypes.arrayOf(PropTypes.object)
};
var defaultProps$4 = {
  flush: false,
  itemAttrs: {},
  nodes: []
};

var ListGroupStyleA = function ListGroupStyleA(_ref) {
  var itemAttrs = _ref.itemAttrs,
      nodes = _ref.nodes,
      attrs = __chunk_1._objectWithoutProperties(_ref, ["itemAttrs", "nodes"]);

  var items = utils.asArray(nodes);
  return items.length ? React__default.createElement(core.ListGroup, attrs, items.map(function (content$$1) {
    return React__default.createElement(ListGroupItemStyleA, __chunk_1._extends({
      key: content$$1.id,
      content: content$$1
    }, itemAttrs));
  })) : null;
};

ListGroupStyleA.displayName = 'Content/ListGroup/StyleA';
ListGroupStyleA.propTypes = propTypes$4;
ListGroupStyleA.defaultProps = defaultProps$4;
ListGroupStyleA.fragments = {
  content: ListGroupItemStyleA.fragments.content
};

exports.CardBodyA = CardBodyStyleA;
exports.CardBodyB = CardBodyStyleB;
exports.CardImage = ContentCardImage;
exports.ListGroupA = ListGroupStyleA;
exports.ListGroupItemA = ListGroupItemStyleA;
