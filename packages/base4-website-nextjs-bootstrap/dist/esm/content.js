import { a as _extends, b as _objectWithoutProperties } from './chunk-2f5ab1ea.js';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { a as Card, b as CardBody } from './chunk-9d06453f.js';
import { PrimaryImageLink, CompanyNameLink, PrimarySectionNameLink, PublishedDate, Row, ShortNameLink, Teaser } from '@base-cms/base4-website-nextjs/components/content';
import { a as ListGroupItem } from './chunk-3d4ab70f.js';
import { a as ListGroupStyleA, b as ListGroupItemA } from './chunk-516a3194.js';
export { a as ListGroupA, b as ListGroupItemA } from './chunk-516a3194.js';
import '@base-cms/base4-website-nextjs/utils';

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
      content = _ref.content,
      attr = _objectWithoutProperties(_ref, ["children", "className", "content"]);

  var _ref2 = content || {},
      id = _ref2.id,
      type = _ref2.type;

  return id && type ? React.createElement(Card, _extends({
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
      content = _ref.content,
      linkClassName = _ref.linkClassName,
      withBody = _ref.withBody,
      rest = _objectWithoutProperties(_ref, ["className", "content", "linkClassName", "withBody"]);

  var imgAttrs = {
    className: classNames(withBody ? 'card-img' : 'card-img-top img-fluid embed-responsive-item', className)
  };
  var linkAttrs = {
    className: classNames('embed-responsive', 'embed-responsive-16by9', linkClassName)
  };
  return React.createElement(PrimaryImageLink, _extends({
    content: content,
    linkAttrs: linkAttrs,
    imgAttrs: imgAttrs
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
  var content = _ref.content,
      attr = _objectWithoutProperties(_ref, ["content"]);

  return React.createElement("div", {
    className: "content content--card-body"
  }, React.createElement(ContentCardImage, {
    content: content
  }), React.createElement(CardBody, attr, React.createElement(ShortNameLink, {
    content: content
  }), React.createElement(CompanyNameLink, {
    content: content,
    tag: "small",
    className: "card-text d-block",
    prefix: "From "
  }), React.createElement(Teaser, {
    content: content,
    className: "card-text"
  }), React.createElement(Row, {
    tag: "small",
    className: "card-text"
  }, React.createElement(PrimarySectionNameLink, {
    content: content,
    className: "mr-2"
  }), React.createElement(PublishedDate, {
    content: content
  }))));
};

CardBodyStyleA.displayName = 'Content/CardBody/StyleA';
CardBodyStyleA.propTypes = propTypes$2;
CardBodyStyleA.defaultProps = defaultProps$2;
CardBodyStyleA.fragments = {
  content: doc
};

var propTypes$3 = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  className: PropTypes.string,
  content: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string
  })
};
var defaultProps$3 = {
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
ContentListGroupItem.propTypes = propTypes$3;
ContentListGroupItem.defaultProps = defaultProps$3;

export { ContentCard as Card, CardBodyStyleA as CardBodyA, ContentCardImage as CardImage, ContentListGroupItem as ListGroupItem };
