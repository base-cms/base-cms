import { a as _objectWithoutProperties, b as _extends, c as _objectSpread } from './chunk-cfc9ba70.js';
import React from 'react';
import PropTypes from 'prop-types';
import { isFunction as isFn, formatDate, componentDisplayName, createMarkup, cleanPath } from './utils.js';
import { get } from 'object-path';
import classNames from 'classnames';
import { Link } from './routing.js';
import Head from 'next/head';
import 'moment';
import './chunk-e05239f9.js';
import './chunk-fd635e66.js';
import 'hoist-non-react-statics';

var propTypes = {
  children: PropTypes.func,
  collapsable: PropTypes.bool,
  tag: PropTypes.string,
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
      attrs = _objectWithoutProperties(_ref, ["children", "collapsable", "tag", "value"]);

  // Protect the child render function.
  var render = isFn(children) ? children : defaultProps.children; // Wrap the value with the element and return (if not collapsable).

  return !value && collapsable ? null : React.createElement(Tag, attrs, render(value));
};

Element.propTypes = propTypes;
Element.defaultProps = defaultProps;

var propTypes$1 = {
  children: PropTypes.func,
  collapsable: PropTypes.bool,
  format: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, // Must adhere to moment date string reqs.
  PropTypes.objectOf(Date)]),
  tag: PropTypes.string
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
      rest = _objectWithoutProperties(_ref, ["format", "value"]);

  // Format the date. Will return null on an invalid date value.
  var value = formatDate(raw, format);
  return React.createElement(Element, _extends({
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
  tag: PropTypes.string
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
      rest = _objectWithoutProperties(_ref, ["data", "path"]);

  // Extract the value off the data object.
  var value = get(data, path, null);
  return React.createElement(FormatDate, _extends({
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
          rest = _objectWithoutProperties(_ref, ["path", "className"]);

      var types = String(path).split('.');
      var elementTypes = types.shift();
      var elementClass = "".concat(modelType, "__").concat(elementTypes);
      var classes = [elementClass];
      types.forEach(function (type) {
        return classes.push("".concat(elementClass, "--").concat(type));
      });
      return React.createElement(Component, _extends({
        className: classNames(classes, className),
        path: path
      }, rest));
    };

    WithModelFieldClass.displayName = "WithModelFieldClass(".concat(componentDisplayName(Component), ")[").concat(modelType, "]");
    WithModelFieldClass.propTypes = _objectSpread({}, Component.propTypes, {
      path: PropTypes.string.isRequired
    });
    return WithModelFieldClass;
  };
});

var DateFieldValue$1 = withModelFieldClass('content')(DateFieldValue);

var propTypes$3 = {
  collapsable: PropTypes.bool,
  tag: PropTypes.string,
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
      attrs = _objectWithoutProperties(_ref, ["collapsable", "value", "tag"]);

  if (!value && collapsable) return null;
  return React.createElement(Tag, _extends({
    dangerouslySetInnerHTML: createMarkup(value)
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
  tag: PropTypes.string
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
      rest = _objectWithoutProperties(_ref, ["asHTML", "data", "path"]);

  // Extract the value off the data object.
  var value = get(data, path, null); // Return as either an innerHTML or regular element.

  return asHTML ? React.createElement(HTMLElement, _extends({
    value: value
  }, rest)) : React.createElement(Element, _extends({
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
      attrs = _objectWithoutProperties(_ref, ["asHTML", "children", "collapsable", "params", "to", "value"]);

  var href = String(to || '');
  var isExternal = href.match(/^(http:|https:|ftp:|mailto:|\/\/)/i);

  var props = _objectSpread({}, attrs, {
    children: children,
    collapsable: collapsable,
    href: isExternal ? href : undefined,
    tag: 'a',
    value: value
  });

  var child = asHTML ? React.createElement(HTMLElement, props) : React.createElement(Element, props);
  if (isExternal) return child;
  return React.createElement(Link, {
    route: href,
    params: params,
    passHref: true
  }, child);
};

LinkElement.propTypes = propTypes$5;
LinkElement.defaultProps = defaultProps$5;

var MetaDescription = function MetaDescription(_ref) {
  var value = _ref.value;
  if (!value) return null;
  return React.createElement(Head, null, React.createElement("meta", {
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

var propTypes$6 = {
  children: PropTypes.func,
  concateWith: PropTypes.string,
  siteName: PropTypes.string,
  value: PropTypes.string.isRequired
};
var defaultProps$6 = {
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
  return React.createElement(Head, null, React.createElement("title", null, isFn(render) ? render() : title));
};

PageTitle.propTypes = propTypes$6;
PageTitle.defaultProps = defaultProps$6;

var RelCanonical = function RelCanonical(_ref) {
  var origin = _ref.origin,
      pathname = _ref.pathname;
  return React.createElement(Head, null, React.createElement("link", {
    rel: "canonical",
    href: "".concat(origin, "/").concat(cleanPath(pathname))
  }));
};

RelCanonical.propTypes = {
  pathname: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired
};

export { DateFieldValue$1 as ContentDateFieldValue, FieldValue$1 as ContentFieldValue, Element, FieldValue, FormatDate, HTMLElement, LinkElement, MetaDescription, PageTitle, RelCanonical };
