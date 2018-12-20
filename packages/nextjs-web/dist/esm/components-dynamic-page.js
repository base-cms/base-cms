import { j as _objectWithoutProperties, f as _extends } from './chunk-cc870ac4.js';
import React from 'react';
import './utils.js';
import 'inflected';
import 'escape-string-regexp';
import 'moment';
import 'object-path';
import 'next/config';
import PropTypes from 'prop-types';
import { c as ObjectValue } from './chunk-559b4f38.js';
import classNames from 'classnames';
import { a as withModelFieldClass } from './chunk-4277d5cc.js';

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
      attrs = _objectWithoutProperties(_ref, ["children", "className", "page", "tag"]);

  var _ref2 = page || {},
      id = _ref2.id,
      alias = _ref2.alias;

  var type = alias ? alias.replace('/', '-').toLowerCase() : alias;
  return React.createElement(Tag, _extends({
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

var ObjectValue$1 = withModelFieldClass('dynamic-page')(ObjectValue);

var _jsxFileName$1 = "/base-cms/packages/nextjs-web/src/components/dynamic-page/Elements/Body.jsx";
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
      rest = _objectWithoutProperties(_ref, ["page"]);

  return React.createElement(ObjectValue$1, _extends({
    asHTML: true,
    path: "body",
    obj: page
  }, rest, {
    __source: {
      fileName: _jsxFileName$1,
      lineNumber: 20
    },
    __self: this
  }));
};

DynamicPageBody.displayName = 'DynamicPage/Elements/Body';
DynamicPageBody.propTypes = propTypes$1;
DynamicPageBody.defaultProps = defaultProps$1;

var _jsxFileName$2 = "/base-cms/packages/nextjs-web/src/components/dynamic-page/Elements/Name.jsx";
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
      rest = _objectWithoutProperties(_ref, ["page"]);

  return React.createElement(ObjectValue$1, _extends({
    path: "name",
    obj: page
  }, rest, {
    __source: {
      fileName: _jsxFileName$2,
      lineNumber: 20
    },
    __self: this
  }));
};

DynamicPageName.displayName = 'DynamicPage/Elements/Name';
DynamicPageName.propTypes = propTypes$2;
DynamicPageName.defaultProps = defaultProps$2;

export { DynamicPageWrapper as Wrapper, DynamicPageBody as Body, DynamicPageName as Name, ObjectValue$1 as ObjectValue };
