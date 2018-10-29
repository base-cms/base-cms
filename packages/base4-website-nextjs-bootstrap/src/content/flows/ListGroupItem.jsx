import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  id: PropTypes.number.isRequired,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  type: PropTypes.string.isRequired,
};

const defaultProps = {
  className: null,
  tag: 'li',
};

const ListGroupItem = ({
  children,
  className,
  id,
  tag: Tag,
  type,
  ...attr
}) => (
  <Tag
    data-id={id}
    className={classNames('content', 'content--list-item', `content--${type}`, 'list-group-item', className)}
    {...attr}
  >
    {children}
  </Tag>
);

ListGroupItem.displayName = 'Content/Flows/ListGroupItem';
ListGroupItem.propTypes = propTypes;
ListGroupItem.defaultProps = defaultProps;

export default ListGroupItem;
