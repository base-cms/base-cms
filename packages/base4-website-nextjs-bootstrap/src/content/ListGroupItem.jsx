import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ListGroupItem from '../core/ListGroupItem';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  className: PropTypes.string,
  content: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
  }),
};

const defaultProps = {
  className: null,
  content: {},
};

const ContentListGroupItem = ({
  children,
  className,
  content,
  ...attr
}) => {
  const { id, type } = content || {};
  return id && type ? (
    <ListGroupItem data-id={id} className={classNames('content', 'content--list-item', `content--${type}`, className)} {...attr}>
      {children}
    </ListGroupItem>
  ) : null;
};

ContentListGroupItem.displayName = 'Content/ListGroupItem';
ContentListGroupItem.propTypes = propTypes;
ContentListGroupItem.defaultProps = defaultProps;

export default ContentListGroupItem;
