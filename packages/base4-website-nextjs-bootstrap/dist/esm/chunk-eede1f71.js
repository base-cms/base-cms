import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

var propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  className: PropTypes.string,
  overImage: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};
var defaultProps = {
  className: null,
  overImage: false,
  tag: 'div'
};

var CardBody = function CardBody(_ref) {
  var children = _ref.children,
      className = _ref.className,
      overImage = _ref.overImage,
      Tag = _ref.tag;
  return React.createElement(Tag, {
    className: classNames(!overImage ? 'card-body' : 'card-img-overlay d-flex flex-column', className)
  }, overImage ? React.createElement("div", {
    className: "mt-auto"
  }, children) : children);
};

CardBody.displayName = 'CardBody';
CardBody.propTypes = propTypes;
CardBody.defaultProps = defaultProps;

export { CardBody as a };
