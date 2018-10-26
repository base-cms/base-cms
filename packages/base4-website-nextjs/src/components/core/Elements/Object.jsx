import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'object-path';
import Date from './Date';
import HTML from './HTML';
import Value from './Value';

const displayName = 'Core/Elements/Object';

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

const ObjectElement = ({
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
  // Return as either an innerHTML or regular element.
  return asHTML ? <HTML value={value} {...rest} /> : <Value value={value} {...rest} />;
};

ObjectElement.displayName = displayName;
ObjectElement.propTypes = propTypes;
ObjectElement.defaultProps = defaultProps;

export default ObjectElement;
