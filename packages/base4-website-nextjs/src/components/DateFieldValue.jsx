import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'object-path';
import FormatDate from './FormatDate';

const propTypes = {
  children: PropTypes.func,
  collapsable: PropTypes.bool,
  data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  format: PropTypes.string,
  path: PropTypes.string.isRequired,
  tag: PropTypes.string,
};

const defaultProps = {
  children: v => v,
  collapsable: false,
  data: {},
  format: 'MMM Do, YYYY',
  tag: 'div',
};

const DateFieldValue = ({
  data,
  path,
  ...rest
}) => {
  // Extract the value off the data object.
  const value = get(data, path, null);
  // Defer to the FormatDate component.
  return <FormatDate value={value} {...rest} />;
};

DateFieldValue.propTypes = propTypes;
DateFieldValue.defaultProps = defaultProps;

export default DateFieldValue;
