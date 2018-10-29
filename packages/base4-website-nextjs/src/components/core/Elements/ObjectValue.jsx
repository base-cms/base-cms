import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'object-path';
import Date from './Date';
import HTML from './HTML';
import Value from './Value';

const propTypes = {
  asDate: PropTypes.bool,
  asHTML: PropTypes.bool,
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  dateFormat: PropTypes.string,
  obj: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  path: PropTypes.string.isRequired,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

const defaultProps = {
  asDate: false,
  asHTML: false,
  children: undefined,
  collapsible: true,
  dateFormat: 'MMM Do, YYYY',
  obj: {},
  tag: 'div',
};

const ObjectValueElement = ({
  asDate,
  asHTML,
  obj,
  dateFormat,
  path,
  ...rest
}) => {
  // Extract the value off the object.
  const value = get(obj, path, null);
  // Return as a date, if applicable.
  if (asDate) return <Date format={dateFormat} value={value} {...rest} />;
  if (asHTML) return <HTML value={value} {...rest} />;
  return <Value value={value} args={[obj, path]} {...rest} />;
};

ObjectValueElement.displayName = 'Core/Elements/ObjectValue';
ObjectValueElement.propTypes = propTypes;
ObjectValueElement.defaultProps = defaultProps;

export default ObjectValueElement;
