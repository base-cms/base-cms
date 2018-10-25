'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-2c19305a.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var utils = require('./utils.js');
var objectPath = require('object-path');
var classNames = _interopDefault(require('classnames'));
var routing = require('./routing.js');
var gql = _interopDefault(require('graphql-tag'));
var Head = _interopDefault(require('next/head'));
require('moment');
require('./chunk-4b678d5c.js');

var propTypes = {
  children: PropTypes.func,
  collapsable: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  value: PropTypes.node
};
var defaultProps = {
  children: function children(v) {
    return v;
  },
  collapsable: false,
  tag: 'div',
  value: null
};

var Element = function Element(_ref) {
  var children = _ref.children,
      collapsable = _ref.collapsable,
      Tag = _ref.tag,
      value = _ref.value,
      attrs = __chunk_1._objectWithoutProperties(_ref, ["children", "collapsable", "tag", "value"]);

  // Protect the child render function.
  var render = utils.isFunction(children) ? children : defaultProps.children; // Wrap the value with the element and return (if not collapsable).

  return !value && collapsable ? null : React__default.createElement(Tag, attrs, render(value));
};

Element.propTypes = propTypes;
Element.defaultProps = defaultProps;

var propTypes$1 = {
  children: PropTypes.func,
  collapsable: PropTypes.bool,
  format: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, // Must adhere to moment date string reqs.
  PropTypes.objectOf(Date)]),
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
var defaultProps$1 = {
  collapsable: true,
  children: undefined,
  format: 'MMM Do, YYYY',
  tag: 'span',
  value: null
};

var FormatDate = function FormatDate(_ref) {
  var format = _ref.format,
      raw = _ref.value,
      rest = __chunk_1._objectWithoutProperties(_ref, ["format", "value"]);

  // Format the date. Will return null on an invalid date value.
  var value = utils.formatDate(raw, format);
  return React__default.createElement(Element, __chunk_1._extends({
    value: value
  }, rest));
};

FormatDate.propTypes = propTypes$1;
FormatDate.defaultProps = defaultProps$1;

var propTypes$2 = {
  children: PropTypes.func,
  collapsable: PropTypes.bool,
  data: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  format: PropTypes.string,
  path: PropTypes.string.isRequired,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
var defaultProps$2 = {
  children: undefined,
  collapsable: false,
  data: {},
  format: 'MMM Do, YYYY',
  tag: 'div'
};

var DateFieldValue = function DateFieldValue(_ref) {
  var data = _ref.data,
      path = _ref.path,
      rest = __chunk_1._objectWithoutProperties(_ref, ["data", "path"]);

  // Extract the value off the data object.
  var value = objectPath.get(data, path, null);
  return React__default.createElement(FormatDate, __chunk_1._extends({
    value: value
  }, rest));
};

DateFieldValue.propTypes = propTypes$2;
DateFieldValue.defaultProps = defaultProps$2;

var withModelFieldClass = (function (modelType) {
  return function (Component) {
    var WithModelFieldClass = function WithModelFieldClass(_ref) {
      var path = _ref.path,
          className = _ref.className,
          rest = __chunk_1._objectWithoutProperties(_ref, ["path", "className"]);

      var types = String(path).split('.');
      var elementTypes = types.shift();
      var elementClass = "".concat(modelType, "__").concat(elementTypes);
      var classes = [elementClass];
      types.forEach(function (type) {
        return classes.push("".concat(elementClass, "--").concat(type));
      });
      return React__default.createElement(Component, __chunk_1._extends({
        className: classNames(classes, className),
        path: path
      }, rest));
    };

    WithModelFieldClass.displayName = "WithModelFieldClass(".concat(utils.componentDisplayName(Component), ")[").concat(modelType, "]");
    WithModelFieldClass.propTypes = __chunk_1._objectSpread({}, Component.propTypes, {
      path: PropTypes.string.isRequired
    });
    return WithModelFieldClass;
  };
});

var DateFieldValue$1 = withModelFieldClass('content')(DateFieldValue);

var propTypes$3 = {
  collapsable: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  value: PropTypes.string
};
var defaultProps$3 = {
  collapsable: false,
  tag: 'div',
  value: ''
};

var HTMLElement = function HTMLElement(_ref) {
  var collapsable = _ref.collapsable,
      value = _ref.value,
      Tag = _ref.tag,
      attrs = __chunk_1._objectWithoutProperties(_ref, ["collapsable", "value", "tag"]);

  if (!value && collapsable) return null;
  return React__default.createElement(Tag, __chunk_1._extends({
    dangerouslySetInnerHTML: utils.createMarkup(value)
  }, attrs));
};

HTMLElement.propTypes = propTypes$3;
HTMLElement.defaultProps = defaultProps$3;

var propTypes$4 = {
  asHTML: PropTypes.bool,
  children: PropTypes.func,
  collapsable: PropTypes.bool,
  data: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  path: PropTypes.string.isRequired,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
var defaultProps$4 = {
  asHTML: false,
  children: undefined,
  collapsable: false,
  data: {},
  tag: 'div'
};

var FieldValue = function FieldValue(_ref) {
  var asHTML = _ref.asHTML,
      data = _ref.data,
      path = _ref.path,
      rest = __chunk_1._objectWithoutProperties(_ref, ["asHTML", "data", "path"]);

  // Extract the value off the data object.
  var value = objectPath.get(data, path, null); // Return as either an innerHTML or regular element.

  return asHTML ? React__default.createElement(HTMLElement, __chunk_1._extends({
    value: value
  }, rest)) : React__default.createElement(Element, __chunk_1._extends({
    value: value
  }, rest));
};

FieldValue.propTypes = propTypes$4;
FieldValue.defaultProps = defaultProps$4;

var FieldValue$1 = withModelFieldClass('content')(FieldValue);

var propTypes$5 = {
  // Whether to render the `value` prop as HTML.
  asHTML: PropTypes.bool,
  // A child function to custom render the `value` prop.
  children: PropTypes.func,
  // Whether the entire component should collapse on an empty value.
  collapsable: PropTypes.bool,
  // Optional parameters for named routes.
  params: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  // Route name or URL to match (per `next-routes`).
  to: PropTypes.string.isRequired,
  // The inner value to render by default.
  value: PropTypes.node
};
var defaultProps$5 = {
  asHTML: false,
  children: undefined,
  collapsable: false,
  params: undefined,
  value: null
};

var LinkElement = function LinkElement(_ref) {
  var asHTML = _ref.asHTML,
      children = _ref.children,
      collapsable = _ref.collapsable,
      params = _ref.params,
      to = _ref.to,
      value = _ref.value,
      attrs = __chunk_1._objectWithoutProperties(_ref, ["asHTML", "children", "collapsable", "params", "to", "value"]);

  var href = String(to || '');
  var isExternal = href.match(/^(http:|https:|ftp:|mailto:|\/\/)/i);

  var props = __chunk_1._objectSpread({}, attrs, {
    children: children,
    collapsable: collapsable,
    href: isExternal ? href : undefined,
    tag: 'a',
    value: value
  });

  var child = asHTML ? React__default.createElement(HTMLElement, props) : React__default.createElement(Element, props);
  if (isExternal) return child;
  return React__default.createElement(routing.Link, {
    route: "/".concat(utils.cleanPath(href)),
    params: params,
    passHref: true
  }, child);
};

LinkElement.propTypes = propTypes$5;
LinkElement.defaultProps = defaultProps$5;

var propTypes$6 = {
  // Whether to render the `value` prop as HTML.
  asHTML: PropTypes.bool,
  // The content canonical path.
  canonicalPath: PropTypes.string.isRequired,
  // A child function to custom render the `value` prop.
  children: PropTypes.func,
  // Whether the entire component should collapse on an empty value.
  collapsable: PropTypes.bool,
  // Optional parameters for named routes.
  params: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  // The inner value to render by default.
  value: PropTypes.node
};
var defaultProps$6 = {
  asHTML: false,
  children: undefined,
  collapsable: false,
  params: undefined,
  value: null
};

var ContentLink = function ContentLink(_ref) {
  var canonicalPath = _ref.canonicalPath,
      rest = __chunk_1._objectWithoutProperties(_ref, ["canonicalPath"]);

  return React__default.createElement(LinkElement, __chunk_1._extends({
    to: canonicalPath,
    className: "content__link"
  }, rest));
};

ContentLink.propTypes = propTypes$6;
ContentLink.defaultProps = defaultProps$6;

var doc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentCanonicalPath"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlatformContent"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"fields"},"value":{"kind":"Variable","name":{"kind":"Name","value":"canonicalFields"}}}]}}],"directives":[]}]}}],"loc":{"start":0,"end":106}};
    doc.loc.source = {"body":"fragment ContentCanonicalPath on PlatformContent {\n  canonicalPath(input: { fields: $canonicalFields })\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

function _templateObject() {
  var data = __chunk_1._taggedTemplateLiteral(["\n    fragment PlatformContentLinkShortName on PlatformContent {\n      shortName\n      ...ContentCanonicalPath\n    }\n    ", "\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var propTypes$7 = {
  collapsable: PropTypes.bool,
  content: PropTypes.shape({
    shortName: PropTypes.string,
    canonicalPath: PropTypes.string
  }),
  linkAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  tag: PropTypes.string
};
var defaultProps$7 = {
  collapsable: false,
  content: {},
  linkAttrs: {},
  tag: 'h5'
};

var ContentLinkShortName = function ContentLinkShortName(_ref) {
  var content = _ref.content,
      linkAttrs = _ref.linkAttrs,
      attrs = __chunk_1._objectWithoutProperties(_ref, ["content", "linkAttrs"]);

  return React__default.createElement(FieldValue$1, __chunk_1._extends({
    path: "shortName",
    data: content
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

ContentLinkShortName.propTypes = propTypes$7;
ContentLinkShortName.defaultProps = defaultProps$7;
ContentLinkShortName.fragments = {
  content: gql(_templateObject(), doc)
};

var propTypes$8 = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};
var defaultProps$8 = {
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

ContentRow.propTypes = propTypes$8;
ContentRow.defaultProps = defaultProps$8;

function _templateObject$1() {
  var data = __chunk_1._taggedTemplateLiteral(["\n    fragment PlatformContentShortName on PlatformContent {\n      shortName\n    }\n  "]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var propTypes$9 = {
  collapsable: PropTypes.bool,
  content: PropTypes.shape({
    shortName: PropTypes.string
  }),
  tag: PropTypes.string
};
var defaultProps$9 = {
  collapsable: false,
  content: {},
  tag: 'h5'
};

var ContentShortName = function ContentShortName(_ref) {
  var content = _ref.content,
      rest = __chunk_1._objectWithoutProperties(_ref, ["content"]);

  return React__default.createElement(FieldValue$1, __chunk_1._extends({
    asHTML: true,
    path: "shortName",
    data: content
  }, rest));
};

ContentShortName.propTypes = propTypes$9;
ContentShortName.defaultProps = defaultProps$9;
ContentShortName.fragments = {
  content: gql(_templateObject$1())
};

var MetaDescription = function MetaDescription(_ref) {
  var value = _ref.value;
  if (!value) return null;
  return React__default.createElement(Head, null, React__default.createElement("meta", {
    name: "description",
    content: value
  }));
};

MetaDescription.propTypes = {
  value: PropTypes.string
};
MetaDescription.defaultProps = {
  value: null
};

var propTypes$a = {
  children: PropTypes.func,
  concateWith: PropTypes.string,
  siteName: PropTypes.string,
  value: PropTypes.string.isRequired
};
var defaultProps$a = {
  children: undefined,
  concateWith: '|',
  siteName: null
};

var PageTitle = function PageTitle(_ref) {
  var render = _ref.children,
      concateWith = _ref.concateWith,
      siteName = _ref.siteName,
      value = _ref.value;
  var title = siteName ? "".concat(value, " ").concat(concateWith, " ").concat(siteName) : value;
  return React__default.createElement(Head, null, React__default.createElement("title", null, utils.isFunction(render) ? render() : title));
};

PageTitle.propTypes = propTypes$a;
PageTitle.defaultProps = defaultProps$a;

var RelCanonical = function RelCanonical(_ref) {
  var origin = _ref.origin,
      pathname = _ref.pathname;
  return React__default.createElement(Head, null, React__default.createElement("link", {
    rel: "canonical",
    href: "".concat(origin, "/").concat(utils.cleanPath(pathname))
  }));
};

RelCanonical.propTypes = {
  pathname: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired
};

exports.ContentDateFieldValue = DateFieldValue$1;
exports.ContentFieldValue = FieldValue$1;
exports.ContentLink = ContentLink;
exports.ContentLinkShortName = ContentLinkShortName;
exports.ContentRow = ContentRow;
exports.ContentShortName = ContentShortName;
exports.Element = Element;
exports.FieldValue = FieldValue;
exports.FormatDate = FormatDate;
exports.HTMLElement = HTMLElement;
exports.LinkElement = LinkElement;
exports.MetaDescription = MetaDescription;
exports.PageTitle = PageTitle;
exports.RelCanonical = RelCanonical;
