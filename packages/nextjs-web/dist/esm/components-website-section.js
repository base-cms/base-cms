import { j as _objectWithoutProperties, f as _extends } from './chunk-cc870ac4.js';
import React from 'react';
import './chunk-fccae6e7.js';
import { sectionPath } from './utils.js';
import 'inflected';
import 'escape-string-regexp';
import 'moment';
import 'object-path';
import 'next/config';
import PropTypes from 'prop-types';
import { c as ObjectValue } from './chunk-e4c58053.js';
import './routing.js';
import { a as LinkElement } from './chunk-38c44d2b.js';
import classNames from 'classnames';
import { a as withModelFieldClass } from './chunk-4277d5cc.js';

var _jsxFileName = "/base-cms/packages/nextjs-web/src/components/website-section/Link.jsx";
var propTypes = {
  // The website section alias.
  alias: PropTypes.string.isRequired,
  // Whether to render the `value` prop as HTML.
  asHTML: PropTypes.bool,
  // A child function to custom render the `value` prop.
  children: PropTypes.func,
  className: PropTypes.string,
  // Whether the entire component should collapse on an empty value.
  collapsible: PropTypes.bool,
  // The section id.
  id: PropTypes.number.isRequired,
  // Optional parameters for named routes.
  params: PropTypes.object,
  // eslint-disable-line react/forbid-prop-types
  // The inner value to render by default.
  value: PropTypes.node
};
var defaultProps = {
  asHTML: false,
  children: undefined,
  className: null,
  collapsible: true,
  params: undefined,
  value: null
}; // @todo Do not make this clickable if the canonicalPath matches the route.

var WebsiteSectionLink = function WebsiteSectionLink(_ref) {
  var alias = _ref.alias,
      className = _ref.className,
      id = _ref.id,
      routePrefix = _ref.routePrefix,
      rest = _objectWithoutProperties(_ref, ["alias", "className", "id", "routePrefix"]);

  return React.createElement(LinkElement, _extends({
    to: sectionPath(alias),
    className: classNames('website-section__link', "website-section__link--".concat(id), className)
  }, rest, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    },
    __self: this
  }));
};

WebsiteSectionLink.displayName = 'WebsiteSection/Link';
WebsiteSectionLink.propTypes = propTypes;
WebsiteSectionLink.defaultProps = defaultProps;

var _jsxFileName$1 = "/base-cms/packages/nextjs-web/src/components/website-section/Wrapper.jsx";
var propTypes$1 = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  section: PropTypes.shape({
    id: PropTypes.number,
    alias: PropTypes.string
  }),
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
var defaultProps$1 = {
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
      fileName: _jsxFileName$1,
      lineNumber: 31
    },
    __self: this
  }), children);
};

WebsiteSectionWrapper.displayName = 'WebsiteSection/Wrapper';
WebsiteSectionWrapper.propTypes = propTypes$1;
WebsiteSectionWrapper.defaultProps = defaultProps$1;

var ObjectValue$1 = withModelFieldClass('website-section')(ObjectValue);

var _jsxFileName$2 = "/base-cms/packages/nextjs-web/src/components/website-section/Elements/Description.jsx";
var propTypes$2 = {
  collapsible: PropTypes.bool,
  section: PropTypes.shape({
    description: PropTypes.string
  }),
  tag: PropTypes.string
};
var defaultProps$2 = {
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
      fileName: _jsxFileName$2,
      lineNumber: 20
    },
    __self: this
  }));
};

WebsiteSectionDescription.displayName = 'WebsiteSection/Elements/Description';
WebsiteSectionDescription.propTypes = propTypes$2;
WebsiteSectionDescription.defaultProps = defaultProps$2;

var _jsxFileName$3 = "/base-cms/packages/nextjs-web/src/components/website-section/Elements/Name.jsx";
var propTypes$3 = {
  collapsible: PropTypes.bool,
  section: PropTypes.shape({
    name: PropTypes.string
  }),
  tag: PropTypes.string
};
var defaultProps$3 = {
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
      fileName: _jsxFileName$3,
      lineNumber: 20
    },
    __self: this
  }));
};

WebsiteSectionName.displayName = 'WebsiteSection/Elements/Name';
WebsiteSectionName.propTypes = propTypes$3;
WebsiteSectionName.defaultProps = defaultProps$3;

export { WebsiteSectionLink as Link, WebsiteSectionWrapper as Wrapper, WebsiteSectionDescription as Description, WebsiteSectionName as Name, ObjectValue$1 as ObjectValue };
