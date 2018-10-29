import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  flush: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

const defaultProps = {
  className: null,
  flush: false,
  tag: 'ul',
};

const ListGroup = ({
  children,
  className,
  flush,
  tag: Tag,
  ...rest
}) => (
  <Tag className={classNames('list-group', flush ? 'list-group-flush' : null, className)} {...rest}>
    {children}
  </Tag>
);

ListGroup.displayName = 'Core/ListGroup';
ListGroup.propTypes = propTypes;
ListGroup.defaultProps = defaultProps;

export default ListGroup;
