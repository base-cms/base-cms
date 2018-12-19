'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-15d55d73.js');
var React = require('react');
var React__default = _interopDefault(React);
var utils = require('./utils.js');
require('inflected');
require('escape-string-regexp');
require('moment');
require('object-path');
require('next/config');
var PropTypes = _interopDefault(require('prop-types'));
var __chunk_5 = require('./chunk-6bc6a447.js');
var classNames = _interopDefault(require('classnames'));

var _jsxFileName = "/base-cms/packages/nextjs-web/src/components/dynamic-page/Wrapper.jsx";
var propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  page: PropTypes.shape({
    id: PropTypes.number,
    alias: PropTypes.string
  }),
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
var defaultProps = {
  className: null,
  page: {},
  tag: 'article'
};

var DynamicPageWrapper = function DynamicPageWrapper(_ref) {
  var children = _ref.children,
      className = _ref.className,
      page = _ref.page,
      Tag = _ref.tag,
      attrs = __chunk_1._objectWithoutProperties(_ref, ["children", "className", "page", "tag"]);

  var _ref2 = page || {},
      id = _ref2.id,
      alias = _ref2.alias;

  var type = alias ? alias.replace('/', '-').toLowerCase() : alias;
  return React__default.createElement(Tag, __chunk_1._extends({
    "data-id": id,
    className: classNames('dynamic-page', 'dynamic-page--display', "dynamic-page--".concat(type), className)
  }, attrs, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }), children);
};

DynamicPageWrapper.displayName = 'DynamicPage/Wrapper';
DynamicPageWrapper.propTypes = propTypes;
DynamicPageWrapper.defaultProps = defaultProps;

var _jsxFileName$1 = "/base-cms/packages/nextjs-web/src/hoc/withModelFieldClass.jsx";
var withModelFieldClass = (function (modelType) {
  return function (Component) {
    var WithModelFieldClass = function WithModelFieldClass(_ref) {
      var path = _ref.path,
          className = _ref.className,
          rest = __chunk_1._objectWithoutProperties(_ref, ["path", "className"]);

      var classes = utils.modelClassNames(modelType, path);
      return React__default.createElement(Component, __chunk_1._extends({
        className: classNames(classes, className),
        path: path
      }, rest, {
        __source: {
          fileName: _jsxFileName$1,
          lineNumber: 13
        },
        __self: this
      }));
    };

    WithModelFieldClass.displayName = "WithModelFieldClass(".concat(utils.componentDisplayName(Component), ")[").concat(modelType, "]");
    WithModelFieldClass.propTypes = __chunk_1._objectSpread({}, Component.propTypes, {
      path: PropTypes.string.isRequired
    });
    return WithModelFieldClass;
  };
});

var ObjectValue = withModelFieldClass('dynamic-page')(__chunk_5.ObjectValue);

var _jsxFileName$2 = "/base-cms/packages/nextjs-web/src/components/dynamic-page/Elements/Body.jsx";
var propTypes$1 = {
  collapsible: PropTypes.bool,
  page: PropTypes.shape({
    body: PropTypes.string
  }),
  tag: PropTypes.string
};
var defaultProps$1 = {
  collapsible: true,
  page: {},
  tag: 'div'
};

var DynamicPageBody = function DynamicPageBody(_ref) {
  var page = _ref.page,
      rest = __chunk_1._objectWithoutProperties(_ref, ["page"]);

  return React__default.createElement(ObjectValue, __chunk_1._extends({
    asHTML: true,
    path: "body",
    obj: page
  }, rest, {
    __source: {
      fileName: _jsxFileName$2,
      lineNumber: 20
    },
    __self: this
  }));
};

DynamicPageBody.displayName = 'DynamicPage/Elements/Body';
DynamicPageBody.propTypes = propTypes$1;
DynamicPageBody.defaultProps = defaultProps$1;

var _jsxFileName$3 = "/base-cms/packages/nextjs-web/src/components/dynamic-page/Elements/Name.jsx";
var propTypes$2 = {
  collapsible: PropTypes.bool,
  page: PropTypes.shape({
    name: PropTypes.string
  }),
  tag: PropTypes.string
};
var defaultProps$2 = {
  collapsible: true,
  page: {},
  tag: 'h1'
};

var DynamicPageName = function DynamicPageName(_ref) {
  var page = _ref.page,
      rest = __chunk_1._objectWithoutProperties(_ref, ["page"]);

  return React__default.createElement(ObjectValue, __chunk_1._extends({
    path: "name",
    obj: page
  }, rest, {
    __source: {
      fileName: _jsxFileName$3,
      lineNumber: 20
    },
    __self: this
  }));
};

DynamicPageName.displayName = 'DynamicPage/Elements/Name';
DynamicPageName.propTypes = propTypes$2;
DynamicPageName.defaultProps = defaultProps$2;

exports.Wrapper = DynamicPageWrapper;
exports.Body = DynamicPageBody;
exports.Name = DynamicPageName;
exports.ObjectValue = ObjectValue;
