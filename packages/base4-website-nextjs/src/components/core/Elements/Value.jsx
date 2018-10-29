import React from 'react';
import PropTypes from 'prop-types';
import { isFunction as isFn } from '../../../utils';

const propTypes = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  // optional context object to send to children callback.
  context: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  value: PropTypes.node,
};

const defaultProps = {
  children: v => v,
  collapsible: true,
  context: {},
  tag: 'div',
  value: null,
};

const ValueElement = ({
  children,
  collapsible,
  context,
  tag: Tag,
  value,
  ...attrs
}) => {
  // Protect the child render function.
  const render = isFn(children) ? children : defaultProps.children;
  // Wrap the value with the element and return (if not collapsible).
  return !value && collapsible ? null : <Tag {...attrs}>{render(value, context)}</Tag>;
};

ValueElement.displayName = 'Core/Elements/Value';
ValueElement.propTypes = propTypes;
ValueElement.defaultProps = defaultProps;

export default ValueElement;
