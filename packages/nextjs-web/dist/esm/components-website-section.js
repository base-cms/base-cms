import { j as _objectWithoutProperties, f as _extends } from './chunk-cc870ac4.js';
import React from 'react';
import './chunk-fccae6e7.js';
import './utils.js';
import 'inflected';
import 'escape-string-regexp';
import 'moment';
import 'object-path';
import 'next/config';
import PropTypes from 'prop-types';
import { c as ObjectValue } from './chunk-559b4f38.js';
import './routing.js';
import './chunk-e963a041.js';
import classNames from 'classnames';
import { a as withModelFieldClass } from './chunk-4277d5cc.js';
export { a as Link } from './chunk-6e8ab5f7.js';

var _jsxFileName = "/base-cms/packages/nextjs-web/src/components/website-section/Wrapper.jsx";
var propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  section: PropTypes.shape({
    id: PropTypes.number,
    alias: PropTypes.string
  }),
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
var defaultProps = {
  className: null,
  section: {},
  tag: 'section'
};

var WebsiteSectionWrapper = function WebsiteSectionWrapper(_ref) {
  var children = _ref.children,
      className = _ref.className,
      section = _ref.section,
      Tag = _ref.tag,
      attrs = _objectWithoutProperties(_ref, ["children", "className", "section", "tag"]);

  var _ref2 = section || {},
      id = _ref2.id,
      alias = _ref2.alias;

  var type = alias ? alias.replace('/', '-') : alias;
  return React.createElement(Tag, _extends({
    "data-id": id,
    className: classNames('website-section', 'website-section--display', "website-section--".concat(type), className)
  }, attrs, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }), children);
};

WebsiteSectionWrapper.displayName = 'WebsiteSection/Wrapper';
WebsiteSectionWrapper.propTypes = propTypes;
WebsiteSectionWrapper.defaultProps = defaultProps;

var ObjectValue$1 = withModelFieldClass('website-section')(ObjectValue);

var _jsxFileName$1 = "/base-cms/packages/nextjs-web/src/components/website-section/Elements/Description.jsx";
var propTypes$1 = {
  collapsible: PropTypes.bool,
  section: PropTypes.shape({
    description: PropTypes.string
  }),
  tag: PropTypes.string
};
var defaultProps$1 = {
  collapsible: true,
  section: {},
  tag: 'div'
};

var WebsiteSectionDescription = function WebsiteSectionDescription(_ref) {
  var section = _ref.section,
      rest = _objectWithoutProperties(_ref, ["section"]);

  return React.createElement(ObjectValue$1, _extends({
    asHTML: true,
    path: "description",
    obj: section
  }, rest, {
    __source: {
      fileName: _jsxFileName$1,
      lineNumber: 20
    },
    __self: this
  }));
};

WebsiteSectionDescription.displayName = 'WebsiteSection/Elements/Description';
WebsiteSectionDescription.propTypes = propTypes$1;
WebsiteSectionDescription.defaultProps = defaultProps$1;

var _jsxFileName$2 = "/base-cms/packages/nextjs-web/src/components/website-section/Elements/Name.jsx";
var propTypes$2 = {
  collapsible: PropTypes.bool,
  section: PropTypes.shape({
    name: PropTypes.string
  }),
  tag: PropTypes.string
};
var defaultProps$2 = {
  collapsible: true,
  section: {},
  tag: 'h1'
};

var WebsiteSectionName = function WebsiteSectionName(_ref) {
  var section = _ref.section,
      rest = _objectWithoutProperties(_ref, ["section"]);

  return React.createElement(ObjectValue$1, _extends({
    path: "name",
    obj: section
  }, rest, {
    __source: {
      fileName: _jsxFileName$2,
      lineNumber: 20
    },
    __self: this
  }));
};

WebsiteSectionName.displayName = 'WebsiteSection/Elements/Name';
WebsiteSectionName.propTypes = propTypes$2;
WebsiteSectionName.defaultProps = defaultProps$2;

export { WebsiteSectionWrapper as Wrapper, WebsiteSectionDescription as Description, WebsiteSectionName as Name, ObjectValue$1 as ObjectValue };
