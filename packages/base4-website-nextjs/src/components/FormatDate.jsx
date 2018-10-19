import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../utils';

const FormatDate = ({
  collapsable,
  format,
  tag: Tag,
  value,
  ...attrs
}) => {
  const formatted = formatDate(value, format);
  if (collapsable && !formatted) return null;
  return <Tag {...attrs}>{formatted}</Tag>;
};

FormatDate.propTypes = {
  collapsable: PropTypes.bool,
  format: PropTypes.string,
  value: PropTypes.number,
  tag: PropTypes.string,
};

FormatDate.defaultProps = {
  collapsable: true,
  format: 'MMM Do, YYYY',
  tag: 'span',
  value: null,
};

export default FormatDate;
