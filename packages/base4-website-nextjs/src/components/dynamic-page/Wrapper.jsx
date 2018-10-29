import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  page: PropTypes.shape({
    id: PropTypes.number,
    alias: PropTypes.string,
  }),
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

const defaultProps = {
  className: null,
  page: {},
  tag: 'article',
};

const DynamicPageWrapper = ({
  children,
  className,
  page,
  tag: Tag,
  ...attrs
}) => {
  const { id, alias } = page || {};
  const type = alias ? alias.replace('/', '-').toLowerCase() : alias;
  return (
    <Tag data-id={id} className={classNames('dynamic-page', 'dynamic-page--display', `dynamic-page--${type}`, className)} {...attrs}>
      {children}
    </Tag>
  );
};

DynamicPageWrapper.displayName = 'DynamicPage/Wrapper';
DynamicPageWrapper.propTypes = propTypes;
DynamicPageWrapper.defaultProps = defaultProps;

export default DynamicPageWrapper;
