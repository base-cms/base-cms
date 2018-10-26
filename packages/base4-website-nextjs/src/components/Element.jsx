import React from 'react';
import PropTypes from 'prop-types';
import { isFunction as isFn } from '../utils';

const propTypes = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  value: PropTypes.node,
};

const defaultProps = {
  children: v => v,
  collapsible: false,
  tag: 'div',
  value: null,
};

const Element = ({
  children,
  collapsible,
  tag: Tag,
  value,
  ...attrs
}) => {
  // Protect the child render function.
  const render = isFn(children) ? children : defaultProps.children;
  // Wrap the value with the element and return (if not collapsible).
  return !value && collapsible ? null : <Tag {...attrs}>{render(value)}</Tag>;
};

Element.propTypes = propTypes;
Element.defaultProps = defaultProps;

export default Element;
