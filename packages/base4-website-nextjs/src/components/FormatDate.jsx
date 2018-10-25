import React from 'react';
import PropTypes from 'prop-types';
import Element from './Element';
import { formatDate } from '../utils';

const propTypes = {
  children: PropTypes.func,
  collapsable: PropTypes.bool,
  format: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string, // Must adhere to moment date string reqs.
    PropTypes.objectOf(Date),
  ]),
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

const defaultProps = {
  collapsable: true,
  children: undefined,
  format: 'MMM Do, YYYY',
  tag: 'span',
  value: null,
};

const FormatDate = ({
  format,
  value: raw,
  ...rest
}) => {
  // Format the date. Will return null on an invalid date value.
  const value = formatDate(raw, format);
  return <Element value={value} {...rest} />;
};

FormatDate.propTypes = propTypes;
FormatDate.defaultProps = defaultProps;

export default FormatDate;
