import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Card from '../core/Card';

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

const ContentCard = ({
  children,
  className,
  content,
  ...attr
}) => {
  const { id, type } = content || {};
  return id && type ? (
    <Card data-id={id} className={classNames('content', 'content--card', `content--${type}`, className)} {...attr}>
      {children}
    </Card>
  ) : null;
};

ContentCard.displayName = 'Content/Card';
ContentCard.propTypes = propTypes;
ContentCard.defaultProps = defaultProps;

export default ContentCard;
