'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-2c19305a.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var __chunk_2 = require('./chunk-30f9615d.js');
var classNames = _interopDefault(require('classnames'));
var inflected = require('inflected');
var utils = require('./utils.js');
var __chunk_4 = require('./chunk-bfb2fae3.js');
var objectPath = require('object-path');
var __chunk_5 = require('./chunk-44287ce2.js');
require('./routing.js');
require('./chunk-4b678d5c.js');
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

  return React__default.createElement(__chunk_2.LinkElement, __chunk_1._extends({
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

var inflect = function inflect(value) {
  return inflected.dasherize(inflected.underscore(value));
};

var withModelFieldClass = (function (modelType) {
  return function (Component) {
    var WithModelFieldClass = function WithModelFieldClass(_ref) {
      var path = _ref.path,
          className = _ref.className,
          rest = __chunk_1._objectWithoutProperties(_ref, ["path", "className"]);

      var types = String(path).split('.');
      var elementTypes = types.shift();
      var elementClass = "".concat(modelType, "__").concat(inflect(elementTypes));
      var classes = [elementClass];
      types.forEach(function (type) {
        return classes.push("".concat(elementClass, "--").concat(inflect(type)));
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

var ObjectValue = withModelFieldClass('content')(__chunk_4.ObjectValue);

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
    teaser: PropTypes.string
  }),
  tag: PropTypes.string
};
var defaultProps$7 = {
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
ContentTeaser.propTypes = propTypes$7;
ContentTeaser.defaultProps = defaultProps$7;

var propTypes$8 = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    type: PropTypes.string
  }),
  tag: PropTypes.string
};
var defaultProps$8 = {
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
ContentType.propTypes = propTypes$8;
ContentType.defaultProps = defaultProps$8;

var propTypes$9 = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    shortName: PropTypes.string,
    canonicalPath: PropTypes.string
  }),
  linkAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  tag: PropTypes.string
};
var defaultProps$9 = {
  children: undefined,
  collapsible: true,
  content: {},
  linkAttrs: {},
  tag: 'span'
};

var CompanyNameLink = function CompanyNameLink(_ref) {
  var children = _ref.children,
      content = _ref.content,
      linkAttrs = _ref.linkAttrs,
      attrs = __chunk_1._objectWithoutProperties(_ref, ["children", "content", "linkAttrs"]);

  return React__default.createElement(ObjectValue, __chunk_1._extends({
    path: "company.name",
    obj: content
  }, attrs), function (value) {
    var canonicalPath = objectPath.get(content, 'company.canonicalPath');
    if (!canonicalPath) return null;
    return React__default.createElement(ContentLink, __chunk_1._extends({
      canonicalPath: canonicalPath,
      value: value
    }, linkAttrs), children);
  });
};

CompanyNameLink.displayName = 'Content/Links/CompanyName';
CompanyNameLink.propTypes = propTypes$9;
CompanyNameLink.defaultProps = defaultProps$9;

var propTypes$a = {
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
  sectionRoutePrefix: PropTypes.string,
  tag: PropTypes.string
};
var defaultProps$a = {
  children: undefined,
  collapsible: true,
  content: {},
  linkAttrs: {},
  sectionRoutePrefix: 'section',
  tag: 'span'
};

var PrimarySectionNameLink = function PrimarySectionNameLink(_ref) {
  var children = _ref.children,
      content = _ref.content,
      sectionRoutePrefix = _ref.sectionRoutePrefix,
      linkAttrs = _ref.linkAttrs,
      attrs = __chunk_1._objectWithoutProperties(_ref, ["children", "content", "sectionRoutePrefix", "linkAttrs"]);

  return React__default.createElement(ObjectValue, __chunk_1._extends({
    path: "primarySection.name",
    obj: content
  }, attrs), function (value) {
    var id = objectPath.get(content, 'primarySection.id');
    var alias = objectPath.get(content, 'primarySection.alias');
    if (!id || !alias) return null;
    return React__default.createElement(__chunk_5.Link, __chunk_1._extends({
      routePrefix: sectionRoutePrefix,
      id: id,
      alias: alias,
      value: value
    }, linkAttrs), children);
  });
};

PrimarySectionNameLink.propTypes = 'Content/Links/PrimarySectionName';
PrimarySectionNameLink.propTypes = propTypes$a;
PrimarySectionNameLink.defaultProps = defaultProps$a;

var propTypes$b = {
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    shortName: PropTypes.string,
    canonicalPath: PropTypes.string
  }),
  linkAttrs: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  tag: PropTypes.string
};
var defaultProps$b = {
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
ShortNameLink.propTypes = propTypes$b;
ShortNameLink.defaultProps = defaultProps$b;

exports.Link = ContentLink;
exports.Wrapper = ContentWrapper;
exports.Body = ContentBody;
exports.Name = ContentName;
exports.ObjectValue = ObjectValue;
exports.PublishedDate = ContentPublishedDate;
exports.Row = ContentRow;
exports.ShortName = ContentShortName;
exports.Teaser = ContentTeaser;
exports.Type = ContentType;
exports.CompanyNameLink = CompanyNameLink;
exports.PrimarySectionNameLink = PrimarySectionNameLink;
exports.ShortNameLink = ShortNameLink;
