'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var __chunk_1 = require('./chunk-9e05845b.js');
var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var classNames = _interopDefault(require('classnames'));
var __chunk_5 = require('./chunk-3a2a9c7d.js');
var __chunk_7 = require('./chunk-ebf541ea.js');
var __chunk_8 = require('./chunk-acf03e8f.js');
require('./utils.js');
require('inflected');
require('escape-string-regexp');
require('moment');
require('object-path');
require('next/config');
require('./chunk-8200e246.js');
require('./routing.js');
require('./chunk-4b678d5c.js');

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
      attrs = __chunk_1._objectWithoutProperties(_ref, ["children", "className", "section", "tag"]);

  var _ref2 = section || {},
      id = _ref2.id,
      alias = _ref2.alias;

  var type = alias ? alias.replace('/', '-') : alias;
  return React__default.createElement(Tag, __chunk_1._extends({
    "data-id": id,
    className: classNames('website-section', 'website-section--display', "website-section--".concat(type), className)
  }, attrs), children);
};

WebsiteSectionWrapper.displayName = 'WebsiteSection/Wrapper';
WebsiteSectionWrapper.propTypes = propTypes;
WebsiteSectionWrapper.defaultProps = defaultProps;

var ObjectValue = __chunk_7.withModelFieldClass('website-section')(__chunk_5.ObjectValue);

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
      rest = __chunk_1._objectWithoutProperties(_ref, ["section"]);

  return React__default.createElement(ObjectValue, __chunk_1._extends({
    asHTML: true,
    path: "description",
    obj: section
  }, rest));
};

WebsiteSectionDescription.displayName = 'WebsiteSection/Elements/Description';
WebsiteSectionDescription.propTypes = propTypes$1;
WebsiteSectionDescription.defaultProps = defaultProps$1;

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
      rest = __chunk_1._objectWithoutProperties(_ref, ["section"]);

  return React__default.createElement(ObjectValue, __chunk_1._extends({
    path: "name",
    obj: section
  }, rest));
};

WebsiteSectionName.displayName = 'WebsiteSection/Elements/Name';
WebsiteSectionName.propTypes = propTypes$2;
WebsiteSectionName.defaultProps = defaultProps$2;

exports.Link = __chunk_8.Link;
exports.Wrapper = WebsiteSectionWrapper;
exports.Description = WebsiteSectionDescription;
exports.Name = WebsiteSectionName;
exports.ObjectValue = ObjectValue;
