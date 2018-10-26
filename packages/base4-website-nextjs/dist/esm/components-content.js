import { c as _objectSpread, a as _extends, b as _objectWithoutProperties } from './chunk-cfc9ba70.js';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { componentDisplayName, isFunction as isFn, formatDate, titleizeType } from './utils.js';
import { a as FieldValue, b as FormatDate, c as LinkElement } from './chunk-45c0288e.js';
import { get } from 'object-path';
import 'moment';
import './routing.js';
import './chunk-7976a9a0.js';

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

var propTypes = {
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    body: PropTypes.string
  }),
  tag: PropTypes.string
};
var defaultProps = {
  collapsible: true,
  content: {},
  tag: 'div'
};

var ContentBody = function ContentBody(_ref) {
  var content = _ref.content,
      rest = _objectWithoutProperties(_ref, ["content"]);

  return React.createElement(FieldValue$1, _extends({
    asHTML: true,
    path: "body",
    data: content
  }, rest));
};

ContentBody.propTypes = propTypes;
ContentBody.defaultProps = defaultProps;

var propTypes$1 = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  data: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  format: PropTypes.string,
  path: PropTypes.string.isRequired,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
var defaultProps$1 = {
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

DateFieldValue.propTypes = propTypes$1;
DateFieldValue.defaultProps = defaultProps$1;

var DateFieldValue$1 = withModelFieldClass('content')(DateFieldValue);

var propTypes$2 = {
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
var defaultProps$2 = {
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

ContentLink.propTypes = propTypes$2;
ContentLink.defaultProps = defaultProps$2;

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

  return React.createElement(FieldValue$1, _extends({
    path: "name",
    data: content
  }, rest));
};

ContentName.propTypes = propTypes$3;
ContentName.defaultProps = defaultProps$3;

var propTypes$4 = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    published: PropTypes.string
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
      prefix = _ref.prefix,
      rest = _objectWithoutProperties(_ref, ["content", "children", "prefix"]);

  // Create the `datetime` element attribute
  // @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time
  var datetime = formatDate(get(content, 'published'));
  return React.createElement(DateFieldValue$1, _extends({
    path: "published",
    data: content,
    datetime: datetime
  }, rest), function (value) {
    var formatted = prefix ? "".concat(prefix, " ").concat(value) : value;
    if (isFn(children)) return children(formatted);
    return formatted;
  });
};

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

  return React.createElement(FieldValue$1, _extends({
    asHTML: true,
    path: "shortName",
    data: content
  }, rest));
};

ContentShortName.propTypes = propTypes$6;
ContentShortName.defaultProps = defaultProps$6;

var propTypes$7 = {
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    shortName: PropTypes.string,
    canonicalPath: PropTypes.string
  }),
  linkAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  tag: PropTypes.string
};
var defaultProps$7 = {
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

ContentLinkShortName.propTypes = propTypes$7;
ContentLinkShortName.defaultProps = defaultProps$7;

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

  return React.createElement(FieldValue$1, _extends({
    asHTML: true,
    path: "teaser",
    data: content
  }, rest));
};

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

  return React.createElement(FieldValue$1, _extends({
    path: "type",
    data: content
  }, rest), function (value) {
    var titleized = titleizeType(value);
    if (isFn(children)) return children(titleized);
    return titleized;
  });
};

ContentType.propTypes = propTypes$9;
ContentType.defaultProps = defaultProps$9;

export { ContentBody as Body, DateFieldValue$1 as DateFieldValue, FieldValue$1 as FieldValue, ContentLink as Link, ContentName as Name, ContentPublishedDate as PublishedDate, ContentRow as Row, ContentShortName as ShortName, ContentLinkShortName as ShortNameLink, ContentTeaser as Teaser, ContentType as Type };
