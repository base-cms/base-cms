import { h as _extends, g as _objectWithoutProperties } from './chunk-1a4eb17c.js';
import React from 'react';
import PropTypes from 'prop-types';
import { a as LinkElement } from './chunk-e8472a28.js';
import classNames from 'classnames';
import { c as ObjectValue } from './chunk-f22d40b2.js';
import { a as withModelFieldClass } from './chunk-ed89f2e2.js';
import { isFunction as isFn, titleizeType, getAsArray, modelClassNames } from './utils.js';
import { get } from 'object-path';
import { a as Link } from './chunk-68922b1d.js';
import './routing.js';
import './chunk-fd635e66.js';
import 'next-routes';
import 'inflected';
import 'moment';

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
      rest = _objectWithoutProperties(_ref, ["canonicalPath"]);

  return React.createElement(LinkElement, _extends({
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
      attrs = _objectWithoutProperties(_ref, ["children", "className", "content", "tag"]);

  var _ref2 = content || {},
      id = _ref2.id,
      type = _ref2.type;

  return React.createElement(Tag, _extends({
    "data-id": id,
    className: classNames('content', 'content--display', "content--".concat(type), className)
  }, attrs), children);
};

ContentWrapper.displayName = 'Content/Wrapper';
ContentWrapper.propTypes = propTypes$1;
ContentWrapper.defaultProps = defaultProps$1;

var ObjectValue$1 = withModelFieldClass('content')(ObjectValue);

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
      rest = _objectWithoutProperties(_ref, ["content"]);

  return React.createElement(ObjectValue$1, _extends({
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
      rest = _objectWithoutProperties(_ref, ["content"]);

  return React.createElement(ObjectValue$1, _extends({
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
      rest = _objectWithoutProperties(_ref, ["content", "children", "format", "prefix"]);

  return React.createElement(ObjectValue$1, _extends({
    asDate: true,
    dateFormat: format,
    path: "published",
    obj: content
  }, rest), function (value) {
    var formatted = prefix ? "".concat(prefix, " ").concat(value) : value;
    if (isFn(children)) return children(formatted);
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
      attrs = _objectWithoutProperties(_ref, ["children", "className", "tag"]);

  return React.createElement(Tag, _extends({
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
      rest = _objectWithoutProperties(_ref, ["content"]);

  return React.createElement(ObjectValue$1, _extends({
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
      rest = _objectWithoutProperties(_ref, ["content"]);

  return React.createElement(ObjectValue$1, _extends({
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
      rest = _objectWithoutProperties(_ref, ["content"]);

  return React.createElement(ObjectValue$1, _extends({
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
      rest = _objectWithoutProperties(_ref, ["content", "children"]);

  return React.createElement(ObjectValue$1, _extends({
    path: "type",
    obj: content
  }, rest), function (value) {
    var titleized = titleizeType(value);
    if (isFn(children)) return children(titleized);
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
      attrs = _objectWithoutProperties(_ref, ["children", "className", "collapsible", "content", "path", "prefix", "elementAttrs", "linkAttrs", "tag"]);

  var edgesPath = "".concat(path, ".edges");
  var edges = getAsArray(content, edgesPath);
  if (collapsible && !edges.length) return null;
  return React.createElement(Tag, _extends({
    className: classNames(modelClassNames('content', edgesPath), className)
  }, attrs), edges.map(function (edge, index) {
    var key = get(edge, 'node.id');
    var canonicalPath = get(edge, 'node.canonicalPath');
    if (collapsible && !canonicalPath) return null;
    return React.createElement(React.Fragment, null, prefix && index === 0 && "".concat(prefix), React.createElement(ObjectValue$1, _extends({
      key: key,
      path: "node.fullName",
      obj: edge,
      collapsible: collapsible
    }, elementAttrs), function (fullName) {
      return React.createElement(ContentLink, _extends({
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
  return React.createElement(ContactFullNameLinks, _extends({
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
      attrs = _objectWithoutProperties(_ref, ["children", "content", "linkAttrs", "prefix"]);

  return React.createElement(ObjectValue$1, _extends({
    path: "company.name",
    obj: content
  }, attrs), function (value) {
    var canonicalPath = get(content, 'company.canonicalPath');
    if (!canonicalPath) return null;
    return React.createElement(React.Fragment, null, prefix && "".concat(prefix), React.createElement(ContentLink, _extends({
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
  return React.createElement(ContactFullNameLinks, _extends({
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
  sectionRoutePrefix: PropTypes.string,
  tag: PropTypes.string
};
var defaultProps$e = {
  children: undefined,
  collapsible: true,
  content: {},
  linkAttrs: {},
  prefix: null,
  sectionRoutePrefix: 'section',
  tag: 'span'
};

var PrimarySectionNameLink = function PrimarySectionNameLink(_ref) {
  var children = _ref.children,
      content = _ref.content,
      prefix = _ref.prefix,
      sectionRoutePrefix = _ref.sectionRoutePrefix,
      linkAttrs = _ref.linkAttrs,
      attrs = _objectWithoutProperties(_ref, ["children", "content", "prefix", "sectionRoutePrefix", "linkAttrs"]);

  return React.createElement(ObjectValue$1, _extends({
    path: "primarySection.name",
    obj: content
  }, attrs), function (value) {
    var id = get(content, 'primarySection.id');
    var alias = get(content, 'primarySection.alias');
    if (!id || !alias) return null;
    return React.createElement(Link, _extends({
      routePrefix: sectionRoutePrefix,
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
      attrs = _objectWithoutProperties(_ref, ["content", "linkAttrs"]);

  return React.createElement(ObjectValue$1, _extends({
    path: "shortName",
    obj: content
  }, attrs), function (value) {
    var canonicalPath = get(content, 'canonicalPath');
    if (!canonicalPath) return null;
    return React.createElement(ContentLink, _extends({
      asHTML: true,
      canonicalPath: canonicalPath,
      value: value
    }, linkAttrs));
  });
};

ShortNameLink.displayName = 'Content/Links/ShortName';
ShortNameLink.propTypes = propTypes$f;
ShortNameLink.defaultProps = defaultProps$f;

export { ContentLink as Link, ContentWrapper as Wrapper, ContentBody as Body, ContentName as Name, ObjectValue$1 as ObjectValue, ContentPublishedDate as PublishedDate, ContentRow as Row, ContentShortName as ShortName, ContentSource as Source, ContentTeaser as Teaser, ContentType as Type, AuthorFullNameLinks, CompanyNameLink, ContactFullNameLinks, ContributorFullNameLinks, PrimarySectionNameLink, ShortNameLink };
