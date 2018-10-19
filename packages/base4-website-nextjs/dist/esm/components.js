import { a as _extends, b as _objectWithoutProperties, d as _objectSpread } from './chunk-cfc9ba70.js';
import React from 'react';
import PropTypes from 'prop-types';
import { createMarkup, isFunction as isFn, componentDisplayName, formatDate, cleanPath } from './utils.js';
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
  prop: PropTypes.string.isRequired,
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
      prop = _ref.prop,
      Tag = _ref.tag,
      attrs = _objectWithoutProperties(_ref, ["asHTML", "children", "collapsable", "data", "prop", "tag"]);

  // Extract the value off the data object, if possible.
  var value = data && data[prop] ? data[prop] : null; // Protect the child render function.

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
      var prop = _ref.prop,
          className = _ref.className,
          rest = _objectWithoutProperties(_ref, ["prop", "className"]);

      return React.createElement(Component, _extends({
        className: classNames("".concat(modelType, "__").concat(prop), className),
        prop: prop
      }, rest));
    };

    WithModelFieldClass.displayName = "WithModelFieldClass(".concat(componentDisplayName(Component), ")[").concat(modelType, "]");
    WithModelFieldClass.propTypes = _objectSpread({}, Component.propTypes, {
      prop: PropTypes.string.isRequired
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
