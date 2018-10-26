import React from 'react';
import PropTypes from 'prop-types';
import DateFieldValue from './DateFieldValue';
import { isFunction as isFn } from '../../../utils';

const propTypes = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    published: PropTypes.string,
  }),
  format: PropTypes.string,
  prefix: PropTypes.string,
  tag: PropTypes.string,
};

const defaultProps = {
  children: undefined,
  collapsible: true,
  content: {},
  format: 'MMM Do, YYYY',
  prefix: '',
  tag: 'div',
};

const ContentPublishedDate = ({
  content,
  children,
  prefix,
  ...rest
}) => (
  <DateFieldValue path="published" data={content} {...rest}>
    {(value) => {
      const formatted = prefix ? `${prefix} ${value}` : value;
      if (isFn(children)) return children(formatted);
      return formatted;
    }}
  </DateFieldValue>
);

ContentPublishedDate.propTypes = propTypes;
ContentPublishedDate.defaultProps = defaultProps;

export default ContentPublishedDate;
