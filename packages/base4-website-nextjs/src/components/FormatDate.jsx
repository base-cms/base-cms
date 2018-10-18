import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const formatValue = (value, format) => {
  if (!value) return '';
  const date = moment(value);
  if (!date.isValid()) return '';
  return moment(value).format(format);
};

const FormatDate = ({
  className,
  collapsable,
  format,
  tag: Tag,
  value,
}) => {
  const formatted = formatValue(value, format);
  if (collapsable && !formatted) return null;
  return <Tag className={className}>{formatValue(value, format)}</Tag>;
};

FormatDate.propTypes = {
  className: PropTypes.string,
  collapsable: PropTypes.bool,
  format: PropTypes.string,
  value: PropTypes.number,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

FormatDate.defaultProps = {
  className: null,
  collapsable: true,
  format: 'MMM Do, YYYY',
  tag: 'span',
  value: null,
};

export default FormatDate;
