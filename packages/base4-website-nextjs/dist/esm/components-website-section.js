import { c as _extends, b as _objectWithoutProperties } from './chunk-1a4eb17c.js';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { a as Link } from './chunk-2623c9a7.js';
export { a as Link } from './chunk-2623c9a7.js';
import './chunk-59d72e94.js';
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
    className: classNames('website-section', 'website-section--display', "content--".concat(type), className)
  }, attrs), children);
};

WebsiteSectionWrapper.displayName = 'Content/Wrapper';
WebsiteSectionWrapper.propTypes = propTypes;
WebsiteSectionWrapper.defaultProps = defaultProps;

export { WebsiteSectionWrapper as Wrapper };
