import React from 'react';
import PropTypes from 'prop-types';
import Value from '../Elements/Value';

const propTypes = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  values: PropTypes.arrayOf(PropTypes.node),
};

const defaultProps = {
  children: undefined,
  collapsible: true,
  tag: 'span',
  values: [],
};

const ValueCollection = ({
  values,
  ...rest
}) => {
  const arr = Array.isArray(values) ? values : [];
  return (
    <>
      {arr.map((value, index) => <Value key={Symbol(index)} value={value} {...rest} />)}
    </>
  );
};

ValueCollection.displayName = 'Core/Collections/Value';
ValueCollection.propTypes = propTypes;
ValueCollection.defaultProps = defaultProps;

export default ValueCollection;
