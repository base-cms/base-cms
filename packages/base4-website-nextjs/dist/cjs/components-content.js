'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-2c19305a.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var objectPath = require('object-path');
var __chunk_2 = require('./chunk-5cbb8258.js');
var classNames = _interopDefault(require('classnames'));
var utils = require('./utils.js');
require('./routing.js');
require('./chunk-4b678d5c.js');
require('moment');

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
      rest = __chunk_1._objectWithoutProperties(_ref, ["data", "path"]);

  // Extract the value off the data object.
  var value = objectPath.get(data, path, null);
  return React__default.createElement(__chunk_2.FormatDate, __chunk_1._extends({
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

var FieldValue = withModelFieldClass('content')(__chunk_2.FieldValue);

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
      rest = __chunk_1._objectWithoutProperties(_ref, ["canonicalPath"]);

  return React__default.createElement(__chunk_2.LinkElement, __chunk_1._extends({
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
      attrs = __chunk_1._objectWithoutProperties(_ref, ["children", "className", "tag"]);

  return React__default.createElement(Tag, __chunk_1._extends({
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
      rest = __chunk_1._objectWithoutProperties(_ref, ["content"]);

  return React__default.createElement(FieldValue, __chunk_1._extends({
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
      attrs = __chunk_1._objectWithoutProperties(_ref, ["content", "linkAttrs"]);

  return React__default.createElement(FieldValue, __chunk_1._extends({
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
      rest = __chunk_1._objectWithoutProperties(_ref, ["content"]);

  return React__default.createElement(FieldValue, __chunk_1._extends({
    asHTML: true,
    path: "teaser",
    data: content
  }, rest));
};

ContentTeaser.propTypes = propTypes$5;
ContentTeaser.defaultProps = defaultProps$5;

exports.DateFieldValue = DateFieldValue$1;
exports.FieldValue = FieldValue;
exports.Link = ContentLink;
exports.Row = ContentRow;
exports.ShortName = ContentShortName;
exports.ShortNameLink = ContentLinkShortName;
exports.Teaser = ContentTeaser;
