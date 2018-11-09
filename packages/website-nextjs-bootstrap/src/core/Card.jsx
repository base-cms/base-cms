import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

const defaultProps = {
  className: null,
  tag: 'div',
};

const Card = ({
  children,
  className,
  tag: Tag,
  ...attr
}) => (
  <Tag className={classNames('card', className)} {...attr}>
    {children}
  </Tag>
);

Card.displayName = 'Core/Card';
Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export default Card;
