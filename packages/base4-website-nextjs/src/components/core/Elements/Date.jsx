import React from 'react';
import PropTypes from 'prop-types';
import Value from './Value';
import { formatDate } from '../../../utils';

const displayName = 'Core/Elements/Date';

const propTypes = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  format: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string, // Must adhere to moment date string reqs.
    PropTypes.objectOf(Date),
  ]),
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

const defaultProps = {
  collapsible: true,
  children: undefined,
  format: 'MMM Do, YYYY',
  tag: 'span',
  value: null,
};

const DateElement = ({
  format,
  value: raw,
  ...rest
}) => {
  // Format the date. Will return null on an invalid date value.
  const value = formatDate(raw, format);
  return <Value value={value} {...rest} />;
};

DateElement.propTypes = displayName;
DateElement.propTypes = propTypes;
DateElement.defaultProps = defaultProps;

export default DateElement;
