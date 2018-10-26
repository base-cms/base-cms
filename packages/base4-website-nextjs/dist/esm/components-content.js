import { b as _extends, a as _objectWithoutProperties, c as _objectSpread } from './chunk-cfc9ba70.js';
import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'object-path';
import { a as FormatDate, b as FieldValue, c as LinkElement } from './chunk-4839c1cf.js';
import classNames from 'classnames';
import { componentDisplayName } from './utils.js';
import './routing.js';
import './chunk-7976a9a0.js';
import 'moment';

var propTypes = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  data: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  format: PropTypes.string,
  path: PropTypes.string.isRequired,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
var defaultProps = {
  children: undefined,
  collapsible: true,
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

DateFieldValue.propTypes = propTypes;
DateFieldValue.defaultProps = defaultProps;

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

var FieldValue$1 = withModelFieldClass('content')(FieldValue);

var propTypes$1 = {
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
var defaultProps$1 = {
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

ContentLink.propTypes = propTypes$1;
ContentLink.defaultProps = defaultProps$1;

var propTypes$2 = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};
var defaultProps$2 = {
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

ContentRow.propTypes = propTypes$2;
ContentRow.defaultProps = defaultProps$2;

var propTypes$3 = {
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    shortName: PropTypes.string
  }),
  tag: PropTypes.string
};
var defaultProps$3 = {
  collapsible: true,
  content: {},
  tag: 'h5'
};

var ContentShortName = function ContentShortName(_ref) {
  var content = _ref.content,
      rest = _objectWithoutProperties(_ref, ["content"]);

  return React.createElement(FieldValue$1, _extends({
    asHTML: true,
    path: "shortName",
    data: content
  }, rest));
};

ContentShortName.propTypes = propTypes$3;
ContentShortName.defaultProps = defaultProps$3;

var propTypes$4 = {
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    shortName: PropTypes.string,
    canonicalPath: PropTypes.string
  }),
  linkAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  tag: PropTypes.string
};
var defaultProps$4 = {
  collapsible: true,
  content: {},
  linkAttrs: {},
  tag: 'h5'
};

var ContentLinkShortName = function ContentLinkShortName(_ref) {
  var content = _ref.content,
      linkAttrs = _ref.linkAttrs,
      attrs = _objectWithoutProperties(_ref, ["content", "linkAttrs"]);

  return React.createElement(FieldValue$1, _extends({
    path: "shortName",
    data: content
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

ContentLinkShortName.propTypes = propTypes$4;
ContentLinkShortName.defaultProps = defaultProps$4;

var propTypes$5 = {
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    teaser: PropTypes.string
  }),
  tag: PropTypes.string
};
var defaultProps$5 = {
  collapsible: true,
  content: {},
  tag: 'div'
};

var ContentTeaser = function ContentTeaser(_ref) {
  var content = _ref.content,
      rest = _objectWithoutProperties(_ref, ["content"]);

  return React.createElement(FieldValue$1, _extends({
    asHTML: true,
    path: "teaser",
    data: content
  }, rest));
};

ContentTeaser.propTypes = propTypes$5;
ContentTeaser.defaultProps = defaultProps$5;

export { DateFieldValue$1 as DateFieldValue, FieldValue$1 as FieldValue, ContentLink as Link, ContentRow as Row, ContentShortName as ShortName, ContentLinkShortName as ShortNameLink, ContentTeaser as Teaser };
