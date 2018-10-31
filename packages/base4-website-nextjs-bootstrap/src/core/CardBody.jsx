import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  className: PropTypes.string,
  overImage: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

const defaultProps = {
  className: null,
  overImage: false,
  tag: 'div',
};

const CardBody = ({
  children,
  className,
  overImage,
  tag: Tag,
}) => (
  <Tag className={classNames(!overImage ? 'card-body' : 'card-img-overlay d-flex flex-column', className)}>
    {overImage ? (
      <div className="mt-auto">
        {children}
      </div>
    ) : children}
  </Tag>
);

CardBody.displayName = 'CardBody';
CardBody.propTypes = propTypes;
CardBody.defaultProps = defaultProps;

export default CardBody;
