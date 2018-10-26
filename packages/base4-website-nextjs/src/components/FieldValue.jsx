import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'object-path';
import HTMLElement from './HTMLElement';
import Element from './Element';

const propTypes = {
  asHTML: PropTypes.bool,
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  path: PropTypes.string.isRequired,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

const defaultProps = {
  asHTML: false,
  children: undefined,
  collapsible: true,
  data: {},
  tag: 'div',
};

const FieldValue = ({
  asHTML,
  data,
  path,
  ...rest
}) => {
  // Extract the value off the data object.
  const value = get(data, path, null);
  // Return as either an innerHTML or regular element.
  return asHTML ? <HTMLElement value={value} {...rest} /> : <Element value={value} {...rest} />;
};

FieldValue.propTypes = propTypes;
FieldValue.defaultProps = defaultProps;

export default FieldValue;
