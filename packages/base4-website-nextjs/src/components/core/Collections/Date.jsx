import React from 'react';
import PropTypes from 'prop-types';
import DateElement from '../Elements/Date';

const propTypes = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  format: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  values: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string, // Must adhere to moment date string reqs.
    PropTypes.objectOf(Date),
  ])),
};

const defaultProps = {
  children: undefined,
  collapsible: true,
  format: 'MMM Do, YYYY',
  tag: 'time',
  values: [],
};

const DateCollection = ({
  values,
  ...rest
}) => {
  const arr = Array.isArray(values) ? values : [];
  return (
    <>
      {arr.map((value, index) => <DateElement key={Symbol(index)} value={value} {...rest} />)}
    </>
  );
};

DateCollection.displayName = 'Core/Collections/Date';
DateCollection.propTypes = propTypes;
DateCollection.defaultProps = defaultProps;

export default DateCollection;
