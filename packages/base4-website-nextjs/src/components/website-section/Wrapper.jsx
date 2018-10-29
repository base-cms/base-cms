import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  section: PropTypes.shape({
    id: PropTypes.number,
    alias: PropTypes.string,
  }),
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

const defaultProps = {
  className: null,
  section: {},
  tag: 'section',
};

const WebsiteSectionWrapper = ({
  children,
  className,
  section,
  tag: Tag,
  ...attrs
}) => {
  const { id, alias } = section || {};
  const type = alias ? alias.replace('/', '-') : alias;
  return (
    <Tag data-id={id} className={classNames('website-section', 'website-section--display', `content--${type}`, className)} {...attrs}>
      {children}
    </Tag>
  );
};

WebsiteSectionWrapper.displayName = 'Content/Wrapper';
WebsiteSectionWrapper.propTypes = propTypes;
WebsiteSectionWrapper.defaultProps = defaultProps;

export default WebsiteSectionWrapper;
