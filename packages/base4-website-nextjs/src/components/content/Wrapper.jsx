import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  content: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
  }),
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

const defaultProps = {
  className: null,
  content: {},
  tag: 'article',
};

const ContentWrapper = ({
  children,
  className,
  content,
  tag: Tag,
  ...attrs
}) => {
  const { id, type } = content || {};
  return (
    <Tag data-id={id} className={classNames('content', 'content--display', `content--${type}`, className)} {...attrs}>
      {children}
    </Tag>
  );
};

ContentWrapper.propTypes = propTypes;
ContentWrapper.defaultProps = defaultProps;

export default ContentWrapper;
