import React from 'react';
import PropTypes from 'prop-types';
import FieldValue from './FieldValue';
import { titleizeType, isFunction as isFn } from '../../../utils';

const propTypes = {
  collapsible: PropTypes.bool,
  children: PropTypes.func,
  content: PropTypes.shape({
    type: PropTypes.string,
  }),
  tag: PropTypes.string,
};

const defaultProps = {
  collapsible: true,
  children: undefined,
  content: {},
  tag: 'h1',
};

const ContentName = ({ content, children, ...rest }) => (
  <FieldValue path="type" data={content} {...rest}>
    {(value) => {
      const titleized = titleizeType();
      if (isFn(children)) return children(titleized);
      return <>{value}</>;
    }}
  </FieldValue>
);

ContentName.propTypes = propTypes;
ContentName.defaultProps = defaultProps;

export default ContentName;
