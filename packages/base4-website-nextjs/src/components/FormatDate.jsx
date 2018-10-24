import React from 'react';
import PropTypes from 'prop-types';
import { isFunction as isFn, formatDate } from '../utils';

const propTypes = {
  children: PropTypes.func,
  collapsable: PropTypes.bool,
  format: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string, // Must adhere to moment date string reqs.
    PropTypes.objectOf(Date),
  ]),
  tag: PropTypes.string,
};

const defaultProps = {
  collapsable: true,
  children: v => v,
  format: 'MMM Do, YYYY',
  tag: 'span',
  value: null,
};

const FormatDate = ({
  children,
  collapsable,
  format,
  tag: Tag,
  value,
  ...attrs
}) => {
  // Format the date. Will return null on an invalid date value.
  const formatted = formatDate(value, format);
  // Protect the child render function.
  const render = isFn(children) ? children : defaultProps.children;
  // Wrap the value with the element and return (if not collapsable).
  return !formatted && collapsable ? null : <Tag {...attrs}>{render(formatted)}</Tag>;
};

FormatDate.propTypes = propTypes;
FormatDate.defaultProps = defaultProps;

export default FormatDate;
