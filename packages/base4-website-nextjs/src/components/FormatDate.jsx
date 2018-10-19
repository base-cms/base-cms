import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../utils';

const FormatDate = ({
  className,
  collapsable,
  format,
  tag: Tag,
  value,
}) => {
  const formatted = formatDate(value, format);
  if (collapsable && !formatted) return null;
  return <Tag className={className}>{formatted}</Tag>;
};

FormatDate.propTypes = {
  className: PropTypes.string,
  collapsable: PropTypes.bool,
  format: PropTypes.string,
  value: PropTypes.number,
  tag: PropTypes.string,
};

FormatDate.defaultProps = {
  className: null,
  collapsable: true,
  format: 'MMM Do, YYYY',
  tag: 'span',
  value: null,
};

export default FormatDate;
