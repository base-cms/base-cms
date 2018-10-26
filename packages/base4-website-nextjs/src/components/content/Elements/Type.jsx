import React from 'react';
import PropTypes from 'prop-types';
import ObjectValue from './ObjectValue';
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

const ContentType = ({ content, children, ...rest }) => (
  <ObjectValue path="type" obj={content} {...rest}>
    {(value) => {
      const titleized = titleizeType(value);
      if (isFn(children)) return children(titleized);
      return titleized;
    }}
  </ObjectValue>
);

ContentType.displayName = 'Content/Elements/Type';
ContentType.propTypes = propTypes;
ContentType.defaultProps = defaultProps;

export default ContentType;
