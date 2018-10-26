import React from 'react';
import PropTypes from 'prop-types';
import FieldValue from './FieldValue';
import { titleizeType, isFunction as isFn } from '../../../utils';

const propTypes = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    type: PropTypes.string,
  }),
  tag: PropTypes.string,
};

const defaultProps = {
  children: undefined,
  collapsible: true,
  content: {},
  tag: 'span',
};

const ContentName = ({ content, children, ...rest }) => (
  <FieldValue path="type" data={content} {...rest}>
    {(value) => {
      const titleized = titleizeType(value);
      if (isFn(children)) return children(titleized);
      return value;
    }}
  </FieldValue>
);

ContentName.propTypes = propTypes;
ContentName.defaultProps = defaultProps;

export default ContentName;
