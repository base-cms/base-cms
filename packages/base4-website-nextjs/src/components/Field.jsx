import React from 'react';
import PropTypes from 'prop-types';
import { createMarkup } from '../utils';

const propTypes = {
  asHTML: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  tag: PropTypes.string,
};

const defaultProps = {
  asHTML: false,
  children: null,
  className: null,
  tag: 'span',
};

const Field = ({
  asHTML,
  children,
  className,
  tag: Tag,
  ...attrs
}) => {
  const html = asHTML && typeof children === 'string' ? children : null;
  return html ? (
    <Tag className={className} {...attrs} dangerouslySetInnerHTML={createMarkup(html)} />
  ) : (
    <Tag className={className} {...attrs}>
      {children}
    </Tag>
  );
};

Field.propTypes = propTypes;
Field.defaultProps = defaultProps;

export default Field;
