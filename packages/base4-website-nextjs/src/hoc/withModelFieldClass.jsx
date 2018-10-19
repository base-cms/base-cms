import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { componentDisplayName } from '../utils';

export default modelType => (Component) => {
  const WithModelFieldClass = ({
    path,
    className,
    ...rest
  }) => {
    const elementType = String(path).replace('.', '-');
    return <Component className={classNames(`${modelType}__${elementType}`, className)} path={path} {...rest} />;
  };
  WithModelFieldClass.displayName = `WithModelFieldClass(${componentDisplayName(Component)})[${modelType}]`;
  WithModelFieldClass.propTypes = {
    ...Component.propTypes,
    path: PropTypes.string.isRequired,
  };
  return WithModelFieldClass;
};
