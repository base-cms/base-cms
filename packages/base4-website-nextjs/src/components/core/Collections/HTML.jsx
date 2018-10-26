import React from 'react';
import PropTypes from 'prop-types';
import HTML from '../Elements/HTML';

const propTypes = {
  collapsible: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  values: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  collapsible: true,
  tag: 'span',
  values: [],
};

const HTMLCollection = ({
  values,
  ...rest
}) => {
  const arr = Array.isArray(values) ? values : [];
  return (
    <>
      {arr.map((value, index) => <HTML key={Symbol(index)} value={value} {...rest} />)}
    </>
  );
};

HTMLCollection.displayName = 'Core/Collections/HTML';
HTMLCollection.propTypes = propTypes;
HTMLCollection.defaultProps = defaultProps;

export default HTMLCollection;
