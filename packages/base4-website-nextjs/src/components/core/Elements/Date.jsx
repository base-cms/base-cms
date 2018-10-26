import React from 'react';
import PropTypes from 'prop-types';
import Value from './Value';
import { formatDate } from '../../../utils';

const propTypes = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  format: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string, // Must adhere to moment date string reqs.
    PropTypes.objectOf(Date),
  ]),
};

const defaultProps = {
  collapsible: true,
  children: undefined,
  format: 'MMM Do, YYYY',
  tag: 'time',
  value: null,
};

const DateElement = ({
  format,
  value: raw,
  ...rest
}) => {
  // Format the date. Will return null on an invalid date value.
  const value = formatDate(raw, format);
  // Create the `datetime` element attribute
  // @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time
  const dateTime = formatDate(raw);
  return <Value value={value} dateTime={dateTime} {...rest} />;
};

DateElement.propTypes = 'Core/Elements/Date';
DateElement.propTypes = propTypes;
DateElement.defaultProps = defaultProps;

export default DateElement;
