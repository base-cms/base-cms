import React from 'react';
import PropTypes from 'prop-types';
import HTML from './HTML';
import { isFunction as isFn } from '../utils';

const propTypes = {
  asHTML: PropTypes.bool,
  children: PropTypes.func,
  collapsable: PropTypes.bool,
  data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  prop: PropTypes.string.isRequired,
  tag: PropTypes.string,
};

const defaultProps = {
  asHTML: false,
  children: v => v,
  collapsable: false,
  data: {},
  tag: 'div',
};

const FieldValue = ({
  asHTML,
  children,
  collapsable,
  data,
  prop,
  tag: Tag,
  ...attrs
}) => {
  // Extract the value off the data object, if possible.
  const value = data && data[prop] ? data[prop] : null;
  // Protect the child render function.
  const render = isFn(children) ? children : defaultProps.children;
  // Return as an innerHTML element, if requested.
  if (asHTML) return <HTML tag={Tag} value={value} collapsable={collapsable} {...attrs} />;
  // Otherwise, wrap the value with the element and return (if not collapsable).
  return !value && collapsable ? null : <Tag {...attrs}>{render(value)}</Tag>;
};

FieldValue.propTypes = propTypes;
FieldValue.defaultProps = defaultProps;

export default FieldValue;
