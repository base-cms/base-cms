'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-3874e52a.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var classNames = _interopDefault(require('classnames'));
var __chunk_2 = require('./chunk-ed516bde.js');
var content = require('@base-cms/base4-website-nextjs/components/content');
var __chunk_4 = require('./chunk-3f552c97.js');
require('./chunk-aadbd80c.js');
require('@base-cms/base4-website-nextjs/utils');

var propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
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

var ContentCard = function ContentCard(_ref) {
  var children = _ref.children,
      className = _ref.className,
      content$$1 = _ref.content,
      attr = __chunk_1._objectWithoutProperties(_ref, ["children", "className", "content"]);

  var _ref2 = content$$1 || {},
      id = _ref2.id,
      type = _ref2.type;

  return id && type ? React__default.createElement(__chunk_2.Card, __chunk_1._extends({
    "data-id": id,
    className: classNames('content', 'content--card', "content--".concat(type), className)
  }, attr), children) : null;
};

ContentCard.displayName = 'Content/Card';
ContentCard.propTypes = propTypes;
ContentCard.defaultProps = defaultProps;

var propTypes$1 = {
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
var defaultProps$1 = {
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

  var classes = classNames(withBody ? 'card-img' : 'card-img-top img-fluid embed-responsive-item', className);
  var linkAttrs = {
    className: classNames('embed-responsive', 'embed-responsive-16by9', linkClassName)
  };
  return React__default.createElement(content.PrimaryImageLink, __chunk_1._extends({
    content: content$$1,
    className: classes,
    linkAttrs: linkAttrs
  }, rest));
};

ContentCardImage.displayName = 'Content/CardImage';
ContentCardImage.propTypes = propTypes$1;
ContentCardImage.defaultProps = defaultProps$1;

var doc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentCardBodyStyleA"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"shortName"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"published"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"primarySection"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alias"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryImage"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"src"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"host"},"value":{"kind":"StringValue","value":"cdn.officer.com","block":false}}]}}],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alt"},"arguments":[],"directives":[]}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContentProduct"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]}]}}]}}]}}],"loc":{"start":0,"end":369}};
    doc.loc.source = {"body":"fragment ContentCardBodyStyleA on PlatformContent {\n  id\n  type\n  shortName\n  published\n  canonicalPath\n  primarySection {\n    id\n    name\n    alias\n  }\n  # @todo Remove the hardcoded CDN!\n  primaryImage {\n    id\n    src(input: { host: \"cdn.officer.com\" })\n    alt\n  }\n  ... on PlatformContentProduct {\n    company {\n      id\n      name\n      canonicalPath\n    }\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

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
  })
};
var defaultProps$2 = {
  content: {}
};

var CardBodyStyleA = function CardBodyStyleA(_ref) {
  var content$$1 = _ref.content,
      attr = __chunk_1._objectWithoutProperties(_ref, ["content"]);

  return React__default.createElement(React__default.Fragment, null, React__default.createElement(ContentCardImage, {
    content: content$$1
  }), React__default.createElement(__chunk_2.CardBody, attr, React__default.createElement(content.ShortNameLink, {
    content: content$$1
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
CardBodyStyleA.propTypes = propTypes$2;
CardBodyStyleA.defaultProps = defaultProps$2;
CardBodyStyleA.fragments = {
  content: doc
};

exports.ListGroupA = __chunk_4.ListGroupStyleA;
exports.ListGroupItem = __chunk_4.ListGroupItem;
exports.ListGroupItemA = __chunk_4.ListGroupItemA;
exports.Card = ContentCard;
exports.CardBodyA = CardBodyStyleA;
exports.CardImage = ContentCardImage;
