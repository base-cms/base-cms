import React from 'react';
import PropTypes from 'prop-types';
import ObjectValue from './ObjectValue';
import { isFunction as isFn } from '../../../utils';

const propTypes = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    published: PropTypes.number,
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
  format,
  prefix,
  ...rest
}) => (
  <ObjectValue asDate dateFormat={format} path="published" obj={content} {...rest}>
    {(value) => {
      const formatted = prefix ? `${prefix} ${value}` : value;
      if (isFn(children)) return children(formatted);
      return formatted;
    }}
  </ObjectValue>
);

ContentPublishedDate.displayName = 'Content/Elements/PublishedDate';
ContentPublishedDate.propTypes = propTypes;
ContentPublishedDate.defaultProps = defaultProps;

export default ContentPublishedDate;
