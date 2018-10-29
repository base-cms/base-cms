import { c as _extends, b as _objectWithoutProperties } from './chunk-1a4eb17c.js';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { b as ObjectValue } from './chunk-f785d688.js';
import { a as withModelFieldClass, b as Link } from './chunk-79aaaca5.js';
export { b as Link } from './chunk-79aaaca5.js';
import './utils.js';
import 'inflected';
import 'moment';
import 'object-path';
import './routing.js';
import './chunk-7976a9a0.js';

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
  }, attrs), children);
};

WebsiteSectionWrapper.displayName = 'WebsiteSection/Wrapper';
WebsiteSectionWrapper.propTypes = propTypes;
WebsiteSectionWrapper.defaultProps = defaultProps;

var ObjectValue$1 = withModelFieldClass('website-section')(ObjectValue);

var propTypes$1 = {
  collapsible: PropTypes.bool,
  section: PropTypes.shape({
    name: PropTypes.string
  }),
  tag: PropTypes.string
};
var defaultProps$1 = {
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
  }, rest));
};

WebsiteSectionName.displayName = 'WebsiteSection/Elements/Name';
WebsiteSectionName.propTypes = propTypes$1;
WebsiteSectionName.defaultProps = defaultProps$1;

export { WebsiteSectionWrapper as Wrapper, WebsiteSectionName as Name, ObjectValue$1 as ObjectValue };
