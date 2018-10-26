import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'object-path';
import DateFieldValue from './DateFieldValue';
import { isFunction as isFn, formatDate } from '../../../utils';

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
  tag: 'time',
};

const ContentPublishedDate = ({
  content,
  children,
  prefix,
  ...rest
}) => {
  // Create the `datetime` element attribute
  // @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time
  const datetime = formatDate(get(content, 'published'));
  return (
    <DateFieldValue path="published" data={content} datetime={datetime} {...rest}>
      {(value) => {
        const formatted = prefix ? `${prefix} ${value}` : value;
        if (isFn(children)) return children(formatted);
        return formatted;
      }}
    </DateFieldValue>
  );
};

ContentPublishedDate.propTypes = propTypes;
ContentPublishedDate.defaultProps = defaultProps;

export default ContentPublishedDate;
