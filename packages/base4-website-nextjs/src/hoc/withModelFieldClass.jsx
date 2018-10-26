import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { underscore, dasherize } from 'inflected';
import { componentDisplayName } from '../utils';

const inflect = value => dasherize(underscore(value));

export default modelType => (Component) => {
  const WithModelFieldClass = ({
    path,
    className,
    ...rest
  }) => {
    const types = String(path).split('.');
    const elementTypes = types.shift();
    const elementClass = `${modelType}__${inflect(elementTypes)}`;
    const classes = [elementClass];
    types.forEach(type => classes.push(`${elementClass}--${inflect(type)}`));
    return <Component className={classNames(classes, className)} path={path} {...rest} />;
  };
  WithModelFieldClass.displayName = `WithModelFieldClass(${componentDisplayName(Component)})[${modelType}]`;
  WithModelFieldClass.propTypes = {
    ...Component.propTypes,
    path: PropTypes.string.isRequired,
  };
  return WithModelFieldClass;
};
