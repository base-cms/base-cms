import React from 'react';
import PropTypes from 'prop-types';
import { isFunction as isFn } from '../../../utils';

const propTypes = {
  // additional arguments to send to the render function.
  args: PropTypes.array,
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  value: PropTypes.node,
};

const defaultProps = {
  args: [],
  children: v => v,
  collapsible: true,
  tag: 'div',
  value: null,
};

const ValueElement = ({
  args,
  children,
  collapsible,
  tag: Tag,
  value,
  ...attrs
}) => {
  // Protect the child render function.
  const render = isFn(children) ? children : defaultProps.children;
  // Wrap the value with the element and return (if not collapsible).
  return !value && collapsible ? null : <Tag {...attrs}>{render(value, ...args)}</Tag>;
};

ValueElement.displayName = 'Core/Elements/Value';
ValueElement.propTypes = propTypes;
ValueElement.defaultProps = defaultProps;

export default ValueElement;
