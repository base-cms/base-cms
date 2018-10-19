import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { componentDisplayName } from '../utils';

export default modelType => (Component) => {
  const WithModelFieldClass = ({
    prop,
    className,
    ...rest
  }) => (
    <Component className={classNames(`${modelType}__${prop}`, className)} prop={prop} {...rest} />
  );
  WithModelFieldClass.displayName = `WithModelFieldClass(${componentDisplayName(Component)})[${modelType}]`;
  WithModelFieldClass.propTypes = {
    ...Component.propTypes,
    prop: PropTypes.string.isRequired,
  };
  return WithModelFieldClass;
};
