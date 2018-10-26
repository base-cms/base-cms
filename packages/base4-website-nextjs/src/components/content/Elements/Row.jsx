import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

const defaultProps = {
  className: null,
  tag: 'div',
};

const ContentRow = ({
  children,
  className,
  tag: Tag,
  ...attrs
}) => (
  <Tag className={classNames('content__element-row', className)} {...attrs}>
    {children}
  </Tag>
);

ContentRow.propTypes = propTypes;
ContentRow.defaultProps = defaultProps;

export default ContentRow;
