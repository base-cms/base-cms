'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-9e05845b.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var classNames = _interopDefault(require('classnames'));
var __chunk_5 = require('./chunk-51ce3b52.js');
var __chunk_7 = require('./chunk-aaf2f7ef.js');
require('./utils.js');
require('next/config');
require('inflected');
require('moment');
require('object-path');

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
  }, attrs), children);
};

DynamicPageWrapper.displayName = 'DynamicPage/Wrapper';
DynamicPageWrapper.propTypes = propTypes;
DynamicPageWrapper.defaultProps = defaultProps;

var ObjectValue = __chunk_7.withModelFieldClass('dynamic-page')(__chunk_5.ObjectValue);

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
  }, rest));
};

DynamicPageBody.displayName = 'DynamicPage/Elements/Body';
DynamicPageBody.propTypes = propTypes$1;
DynamicPageBody.defaultProps = defaultProps$1;

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
  }, rest));
};

DynamicPageName.displayName = 'DynamicPage/Elements/Name';
DynamicPageName.propTypes = propTypes$2;
DynamicPageName.defaultProps = defaultProps$2;

exports.Wrapper = DynamicPageWrapper;
exports.Body = DynamicPageBody;
exports.Name = DynamicPageName;
exports.ObjectValue = ObjectValue;
