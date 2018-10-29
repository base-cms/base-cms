import { c as _extends, b as _objectWithoutProperties } from './chunk-1a4eb17c.js';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { c as ObjectValue } from './chunk-f22d40b2.js';
import { a as withModelFieldClass } from './chunk-ed89f2e2.js';
import './utils.js';
import 'inflected';
import 'moment';
import 'object-path';

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
  }, attrs), children);
};

DynamicPageWrapper.displayName = 'DynamicPage/Wrapper';
DynamicPageWrapper.propTypes = propTypes;
DynamicPageWrapper.defaultProps = defaultProps;

var ObjectValue$1 = withModelFieldClass('dynamic-page')(ObjectValue);

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
      rest = _objectWithoutProperties(_ref, ["page"]);

  return React.createElement(ObjectValue$1, _extends({
    path: "name",
    obj: page
  }, rest));
};

DynamicPageName.displayName = 'DynamicPage/Elements/Name';
DynamicPageName.propTypes = propTypes$2;
DynamicPageName.defaultProps = defaultProps$2;

export { DynamicPageWrapper as Wrapper, DynamicPageBody as Body, DynamicPageName as Name, ObjectValue$1 as ObjectValue };
