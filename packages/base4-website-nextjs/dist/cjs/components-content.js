'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-9e05845b.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var __chunk_6 = require('./chunk-950ecfbb.js');
var classNames = _interopDefault(require('classnames'));
var __chunk_5 = require('./chunk-51ce3b52.js');
var __chunk_7 = require('./chunk-aaf2f7ef.js');
var utils = require('./utils.js');
var objectPath = require('object-path');
var __chunk_8 = require('./chunk-479d7ead.js');
require('./routing.js');
require('./chunk-4b678d5c.js');
require('next/config');
require('inflected');
require('moment');

var propTypes = {
  // Whether to render the `value` prop as HTML.
  asHTML: PropTypes.bool,
  // The content canonical path.
  canonicalPath: PropTypes.string.isRequired,
  // A child function to custom render the `value` prop.
  children: PropTypes.func,
  // Whether the entire component should collapse on an empty value.
  collapsible: PropTypes.bool,
  // Optional parameters for named routes.
  params: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  // The inner value to render by default.
  value: PropTypes.node
};
var defaultProps = {
  asHTML: false,
  children: undefined,
  collapsible: true,
  params: undefined,
  value: null
}; // @todo Do not make this clickable if the canonicalPath matches the route.

var ContentLink = function ContentLink(_ref) {
  var canonicalPath = _ref.canonicalPath,
      rest = __chunk_1._objectWithoutProperties(_ref, ["canonicalPath"]);

  return React__default.createElement(__chunk_6.LinkElement, __chunk_1._extends({
    to: canonicalPath,
    className: "content__link"
  }, rest));
};

ContentLink.displayName = 'Content/Link';
ContentLink.propTypes = propTypes;
ContentLink.defaultProps = defaultProps;

var propTypes$1 = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  content: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string
  }),
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
var defaultProps$1 = {
  className: null,
  content: {},
  tag: 'article'
};

var ContentWrapper = function ContentWrapper(_ref) {
  var children = _ref.children,
      className = _ref.className,
      content = _ref.content,
      Tag = _ref.tag,
      attrs = __chunk_1._objectWithoutProperties(_ref, ["children", "className", "content", "tag"]);

  var _ref2 = content || {},
      id = _ref2.id,
      type = _ref2.type;

  return React__default.createElement(Tag, __chunk_1._extends({
    "data-id": id,
    className: classNames('content', 'content--display', "content--".concat(type), className)
  }, attrs), children);
};

ContentWrapper.displayName = 'Content/Wrapper';
ContentWrapper.propTypes = propTypes$1;
ContentWrapper.defaultProps = defaultProps$1;

var ObjectValue = __chunk_7.withModelFieldClass('content')(__chunk_5.ObjectValue);

var propTypes$2 = {
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    body: PropTypes.string
  }),
  tag: PropTypes.string
};
var defaultProps$2 = {
  collapsible: true,
  content: {},
  tag: 'div'
};

var ContentBody = function ContentBody(_ref) {
  var content = _ref.content,
      rest = __chunk_1._objectWithoutProperties(_ref, ["content"]);

  return React__default.createElement(ObjectValue, __chunk_1._extends({
    asHTML: true,
    path: "body",
    obj: content
  }, rest));
};

ContentBody.displayName = 'Content/Elements/Body';
ContentBody.propTypes = propTypes$2;
ContentBody.defaultProps = defaultProps$2;

var propTypes$3 = {
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    name: PropTypes.string
  }),
  tag: PropTypes.string
};
var defaultProps$3 = {
  collapsible: true,
  content: {},
  tag: 'h1'
};

var ContentName = function ContentName(_ref) {
  var content = _ref.content,
      rest = __chunk_1._objectWithoutProperties(_ref, ["content"]);

  return React__default.createElement(ObjectValue, __chunk_1._extends({
    path: "name",
    obj: content
  }, rest));
};

ContentName.displayName = 'Content/Elements/Name';
ContentName.propTypes = propTypes$3;
ContentName.defaultProps = defaultProps$3;

var propTypes$4 = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    published: PropTypes.number
  }),
  format: PropTypes.string,
  prefix: PropTypes.string,
  tag: PropTypes.string
};
var defaultProps$4 = {
  children: undefined,
  collapsible: true,
  content: {},
  format: 'MMM Do, YYYY',
  prefix: '',
  tag: 'time'
};

var ContentPublishedDate = function ContentPublishedDate(_ref) {
  var content = _ref.content,
      children = _ref.children,
      format = _ref.format,
      prefix = _ref.prefix,
      rest = __chunk_1._objectWithoutProperties(_ref, ["content", "children", "format", "prefix"]);

  return React__default.createElement(ObjectValue, __chunk_1._extends({
    asDate: true,
    dateFormat: format,
    path: "published",
    obj: content
  }, rest), function (value) {
    var formatted = prefix ? "".concat(prefix, " ").concat(value) : value;
    if (utils.isFunction(children)) return children(formatted);
    return formatted;
  });
};

ContentPublishedDate.displayName = 'Content/Elements/PublishedDate';
ContentPublishedDate.propTypes = propTypes$4;
ContentPublishedDate.defaultProps = defaultProps$4;

var propTypes$5 = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};
var defaultProps$5 = {
  className: null,
  tag: 'div'
};

var ContentRow = function ContentRow(_ref) {
  var children = _ref.children,
      className = _ref.className,
      Tag = _ref.tag,
      attrs = __chunk_1._objectWithoutProperties(_ref, ["children", "className", "tag"]);

  return React__default.createElement(Tag, __chunk_1._extends({
    className: classNames('content__element-row', className)
  }, attrs), children);
};

ContentRow.propTypes = propTypes$5;
ContentRow.defaultProps = defaultProps$5;

var propTypes$6 = {
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    shortName: PropTypes.string
  }),
  tag: PropTypes.string
};
var defaultProps$6 = {
  collapsible: true,
  content: {},
  tag: 'h5'
};

var ContentShortName = function ContentShortName(_ref) {
  var content = _ref.content,
      rest = __chunk_1._objectWithoutProperties(_ref, ["content"]);

  return React__default.createElement(ObjectValue, __chunk_1._extends({
    asHTML: true,
    path: "shortName",
    obj: content
  }, rest));
};

ContentShortName.displayName = 'Content/Elements/ShortName';
ContentShortName.propTypes = propTypes$6;
ContentShortName.defaultProps = defaultProps$6;

var propTypes$7 = {
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    name: PropTypes.string
  }),
  tag: PropTypes.string
};
var defaultProps$7 = {
  collapsible: true,
  content: {},
  tag: 'span'
};

var ContentSource = function ContentSource(_ref) {
  var content = _ref.content,
      rest = __chunk_1._objectWithoutProperties(_ref, ["content"]);

  return React__default.createElement(ObjectValue, __chunk_1._extends({
    path: "source",
    obj: content
  }, rest));
};

ContentSource.displayName = 'Content/Elements/Source';
ContentSource.propTypes = propTypes$7;
ContentSource.defaultProps = defaultProps$7;

var propTypes$8 = {
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    teaser: PropTypes.string
  }),
  tag: PropTypes.string
};
var defaultProps$8 = {
  collapsible: true,
  content: {},
  tag: 'div'
};

var ContentTeaser = function ContentTeaser(_ref) {
  var content = _ref.content,
      rest = __chunk_1._objectWithoutProperties(_ref, ["content"]);

  return React__default.createElement(ObjectValue, __chunk_1._extends({
    asHTML: true,
    path: "teaser",
    obj: content
  }, rest));
};

ContentTeaser.displayName = 'Content/Elements/Teaser';
ContentTeaser.propTypes = propTypes$8;
ContentTeaser.defaultProps = defaultProps$8;

var propTypes$9 = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    type: PropTypes.string
  }),
  tag: PropTypes.string
};
var defaultProps$9 = {
  children: undefined,
  collapsible: true,
  content: {},
  tag: 'span'
};

var ContentType = function ContentType(_ref) {
  var content = _ref.content,
      children = _ref.children,
      rest = __chunk_1._objectWithoutProperties(_ref, ["content", "children"]);

  return React__default.createElement(ObjectValue, __chunk_1._extends({
    path: "type",
    obj: content
  }, rest), function (value) {
    var titleized = utils.titleizeType(value);
    if (utils.isFunction(children)) return children(titleized);
    return titleized;
  });
};

ContentType.displayName = 'Content/Elements/Type';
ContentType.propTypes = propTypes$9;
ContentType.defaultProps = defaultProps$9;

var propTypes$a = {
  children: PropTypes.func,
  className: PropTypes.string,
  collapsible: PropTypes.bool,
  elementAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  linkAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  path: PropTypes.oneOf(['authors', 'contributors', 'photographers']).isRequired,
  prefix: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
var defaultProps$a = {
  children: undefined,
  className: null,
  collapsible: true,
  elementAttrs: {},
  linkAttrs: {},
  prefix: null,
  tag: 'div'
};

var ContactFullNameLinks = function ContactFullNameLinks(_ref) {
  var children = _ref.children,
      className = _ref.className,
      collapsible = _ref.collapsible,
      content = _ref.content,
      path = _ref.path,
      prefix = _ref.prefix,
      elementAttrs = _ref.elementAttrs,
      linkAttrs = _ref.linkAttrs,
      Tag = _ref.tag,
      attrs = __chunk_1._objectWithoutProperties(_ref, ["children", "className", "collapsible", "content", "path", "prefix", "elementAttrs", "linkAttrs", "tag"]);

  var edgesPath = "".concat(path, ".edges");
  var edges = utils.getAsArray(content, edgesPath);
  if (collapsible && !edges.length) return null;
  return React__default.createElement(Tag, __chunk_1._extends({
    className: classNames(utils.modelClassNames('content', edgesPath), className)
  }, attrs), edges.map(function (edge, index) {
    var key = objectPath.get(edge, 'node.id');
    var canonicalPath = objectPath.get(edge, 'node.canonicalPath');
    if (collapsible && !canonicalPath) return null;
    return React__default.createElement(React.Fragment, {
      key: key
    }, prefix && index === 0 && "".concat(prefix), React__default.createElement(ObjectValue, __chunk_1._extends({
      path: "node.fullName",
      obj: edge,
      collapsible: collapsible
    }, elementAttrs), function (fullName) {
      return React__default.createElement(ContentLink, __chunk_1._extends({
        canonicalPath: canonicalPath,
        value: fullName
      }, linkAttrs), children);
    }));
  }));
};

ContactFullNameLinks.displayName = 'Content/Links/ContactFullNames';
ContactFullNameLinks.propTypes = propTypes$a;
ContactFullNameLinks.defaultProps = defaultProps$a;

var propTypes$b = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  elementAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  linkAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  prefix: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
var defaultProps$b = {
  children: undefined,
  collapsible: true,
  elementAttrs: {},
  linkAttrs: {},
  prefix: null,
  tag: 'div'
};

var AuthorFullNameLinks = function AuthorFullNameLinks(props) {
  return React__default.createElement(ContactFullNameLinks, __chunk_1._extends({
    path: "authors"
  }, props));
};

AuthorFullNameLinks.displayName = 'Content/Links/AuthorFullNames';
AuthorFullNameLinks.propTypes = propTypes$b;
AuthorFullNameLinks.defaultProps = defaultProps$b;

var propTypes$c = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    shortName: PropTypes.string,
    canonicalPath: PropTypes.string
  }),
  linkAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  prefix: PropTypes.string,
  tag: PropTypes.string
};
var defaultProps$c = {
  children: undefined,
  collapsible: true,
  content: {},
  linkAttrs: {},
  prefix: null,
  tag: 'span'
};

var CompanyNameLink = function CompanyNameLink(_ref) {
  var children = _ref.children,
      content = _ref.content,
      linkAttrs = _ref.linkAttrs,
      prefix = _ref.prefix,
      attrs = __chunk_1._objectWithoutProperties(_ref, ["children", "content", "linkAttrs", "prefix"]);

  return React__default.createElement(ObjectValue, __chunk_1._extends({
    path: "company.name",
    obj: content
  }, attrs), function (value) {
    var canonicalPath = objectPath.get(content, 'company.canonicalPath');
    if (!canonicalPath) return null;
    return React__default.createElement(React__default.Fragment, null, prefix && "".concat(prefix), React__default.createElement(ContentLink, __chunk_1._extends({
      canonicalPath: canonicalPath,
      value: value
    }, linkAttrs), children));
  });
};

CompanyNameLink.displayName = 'Content/Links/CompanyName';
CompanyNameLink.propTypes = propTypes$c;
CompanyNameLink.defaultProps = defaultProps$c;

var propTypes$d = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  elementAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  linkAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  prefix: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
var defaultProps$d = {
  children: undefined,
  collapsible: true,
  elementAttrs: {},
  linkAttrs: {},
  prefix: null,
  tag: 'div'
};

var ContributorFullNameLinks = function ContributorFullNameLinks(props) {
  return React__default.createElement(ContactFullNameLinks, __chunk_1._extends({
    path: "contributors"
  }, props));
};

ContributorFullNameLinks.displayName = 'Content/Links/ContributorFullNames';
ContributorFullNameLinks.propTypes = propTypes$d;
ContributorFullNameLinks.defaultProps = defaultProps$d;

var propTypes$e = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    primarySection: PropTypes.shape({
      id: PropTypes.number,
      alias: PropTypes.string,
      name: PropTypes.string
    })
  }),
  linkAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  prefix: PropTypes.string,
  tag: PropTypes.string
};
var defaultProps$e = {
  children: undefined,
  collapsible: true,
  content: {},
  linkAttrs: {},
  prefix: null,
  tag: 'span'
};

var PrimarySectionNameLink = function PrimarySectionNameLink(_ref) {
  var children = _ref.children,
      content = _ref.content,
      prefix = _ref.prefix,
      linkAttrs = _ref.linkAttrs,
      attrs = __chunk_1._objectWithoutProperties(_ref, ["children", "content", "prefix", "linkAttrs"]);

  return React__default.createElement(ObjectValue, __chunk_1._extends({
    path: "primarySection.name",
    obj: content
  }, attrs), function (value) {
    var id = objectPath.get(content, 'primarySection.id');
    var alias = objectPath.get(content, 'primarySection.alias');
    if (!id || !alias) return null;
    return React__default.createElement(__chunk_8.Link, __chunk_1._extends({
      id: id,
      alias: alias,
      value: value
    }, linkAttrs), children);
  });
};

PrimarySectionNameLink.propTypes = 'Content/Links/PrimarySectionName';
PrimarySectionNameLink.propTypes = propTypes$e;
PrimarySectionNameLink.defaultProps = defaultProps$e;

var propTypes$f = {
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    shortName: PropTypes.string,
    canonicalPath: PropTypes.string
  }),
  linkAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  tag: PropTypes.string
};
var defaultProps$f = {
  collapsible: true,
  content: {},
  linkAttrs: {},
  tag: 'h5'
};

var ShortNameLink = function ShortNameLink(_ref) {
  var content = _ref.content,
      linkAttrs = _ref.linkAttrs,
      attrs = __chunk_1._objectWithoutProperties(_ref, ["content", "linkAttrs"]);

  return React__default.createElement(ObjectValue, __chunk_1._extends({
    path: "shortName",
    obj: content
  }, attrs), function (value) {
    var canonicalPath = objectPath.get(content, 'canonicalPath');
    if (!canonicalPath) return null;
    return React__default.createElement(ContentLink, __chunk_1._extends({
      asHTML: true,
      canonicalPath: canonicalPath,
      value: value
    }, linkAttrs));
  });
};

ShortNameLink.displayName = 'Content/Links/ShortName';
ShortNameLink.propTypes = propTypes$f;
ShortNameLink.defaultProps = defaultProps$f;

exports.Link = ContentLink;
exports.Wrapper = ContentWrapper;
exports.Body = ContentBody;
exports.Name = ContentName;
exports.ObjectValue = ObjectValue;
exports.PublishedDate = ContentPublishedDate;
exports.Row = ContentRow;
exports.ShortName = ContentShortName;
exports.Source = ContentSource;
exports.Teaser = ContentTeaser;
exports.Type = ContentType;
exports.AuthorFullNameLinks = AuthorFullNameLinks;
exports.CompanyNameLink = CompanyNameLink;
exports.ContactFullNameLinks = ContactFullNameLinks;
exports.ContributorFullNameLinks = ContributorFullNameLinks;
exports.PrimarySectionNameLink = PrimarySectionNameLink;
exports.ShortNameLink = ShortNameLink;
