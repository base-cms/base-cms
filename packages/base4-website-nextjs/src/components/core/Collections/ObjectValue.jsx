import React from 'react';
import PropTypes from 'prop-types';
import ObjectValue from '../Elements/ObjectValue';

const propTypes = {
  asDate: PropTypes.bool,
  asHTML: PropTypes.bool,
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  dateFormat: PropTypes.string,
  objs: PropTypes.arrayOf(PropTypes.object),
  path: PropTypes.string.isRequired,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

const defaultProps = {
  asDate: false,
  asHTML: false,
  children: undefined,
  collapsible: true,
  dateFormat: 'MMM Do, YYYY',
  objs: [],
  tag: 'span',
};

const ObjectValueCollection = ({
  objs,
  ...rest
}) => {
  const arr = Array.isArray(objs) ? objs : [];
  return (
    <>
      {arr.map((obj, index) => <ObjectValue key={index} obj={obj} {...rest} />)}
    </>
  );
};

ObjectValueCollection.displayName = 'Core/Collections/ObjectValue';
ObjectValueCollection.propTypes = propTypes;
ObjectValueCollection.defaultProps = defaultProps;

export default ObjectValueCollection;
