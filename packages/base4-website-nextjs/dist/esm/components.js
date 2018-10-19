import { a as _extends, b as _objectWithoutProperties, d as _objectSpread } from './chunk-cfc9ba70.js';
import React from 'react';
import PropTypes from 'prop-types';
import { createMarkup, isFunction as isFn, componentDisplayName, formatDate, cleanPath } from './utils.js';
import { get } from 'object-path';
import classNames from 'classnames';
import Head from 'next/head';
import 'moment';

var propTypes = {
  collapsable: PropTypes.bool,
  tag: PropTypes.string,
  value: PropTypes.string
};
var defaultProps = {
  collapsable: false,
  tag: 'div',
  value: ''
};

var HTML = function HTML(_ref) {
  var collapsable = _ref.collapsable,
      value = _ref.value,
      Tag = _ref.tag,
      attrs = _objectWithoutProperties(_ref, ["collapsable", "value", "tag"]);

  if (!value && collapsable) return null;
  return React.createElement(Tag, _extends({
    dangerouslySetInnerHTML: createMarkup(value)
  }, attrs));
};

HTML.propTypes = propTypes;
HTML.defaultProps = defaultProps;

var propTypes$1 = {
  asHTML: PropTypes.bool,
  children: PropTypes.func,
  collapsable: PropTypes.bool,
  data: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  path: PropTypes.string.isRequired,
  tag: PropTypes.string
};
var defaultProps$1 = {
  asHTML: false,
  children: function children(v) {
    return v;
  },
  collapsable: false,
  data: {},
  tag: 'div'
};

var FieldValue = function FieldValue(_ref) {
  var asHTML = _ref.asHTML,
      children = _ref.children,
      collapsable = _ref.collapsable,
      data = _ref.data,
      path = _ref.path,
      Tag = _ref.tag,
      attrs = _objectWithoutProperties(_ref, ["asHTML", "children", "collapsable", "data", "path", "tag"]);

  // Extract the value off the data object.
  var value = get(data, path, null); // Protect the child render function.

  var render = isFn(children) ? children : defaultProps$1.children; // Return as an innerHTML element, if requested.

  if (asHTML) return React.createElement(HTML, _extends({
    tag: Tag,
    value: value,
    collapsable: collapsable
  }, attrs)); // Otherwise, wrap the value with the element and return (if not collapsable).

  return !value && collapsable ? null : React.createElement(Tag, attrs, render(value));
};

FieldValue.propTypes = propTypes$1;
FieldValue.defaultProps = defaultProps$1;

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

var FieldValue$1 = withModelFieldClass('content')(FieldValue);

var FormatDate = function FormatDate(_ref) {
  var collapsable = _ref.collapsable,
      format = _ref.format,
      Tag = _ref.tag,
      value = _ref.value,
      attrs = _objectWithoutProperties(_ref, ["collapsable", "format", "tag", "value"]);

  var formatted = formatDate(value, format);
  if (collapsable && !formatted) return null;
  return React.createElement(Tag, attrs, formatted);
};

FormatDate.propTypes = {
  collapsable: PropTypes.bool,
  format: PropTypes.string,
  value: PropTypes.number,
  tag: PropTypes.string
};
FormatDate.defaultProps = {
  collapsable: true,
  format: 'MMM Do, YYYY',
  tag: 'span',
  value: null
};

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

var PageTitle = function PageTitle(_ref) {
  var value = _ref.value,
      siteName = _ref.siteName,
      concateWith = _ref.concateWith;
  var title = siteName ? "".concat(value, " ").concat(concateWith, " ").concat(siteName) : value;
  return React.createElement(Head, null, React.createElement("title", null, title));
};

PageTitle.propTypes = {
  value: PropTypes.string.isRequired,
  siteName: PropTypes.string,
  concateWith: PropTypes.string
};
PageTitle.defaultProps = {
  siteName: null,
  concateWith: '|'
};

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

export { FieldValue$1 as ContentFieldValue, FieldValue, FormatDate, HTML, MetaDescription, PageTitle, RelCanonical };
