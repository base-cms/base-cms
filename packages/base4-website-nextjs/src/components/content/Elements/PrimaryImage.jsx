import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getAsObject, modelClassNames, isFunction as isFn } from '../../../utils';

const propTypes = {
  children: PropTypes.func,
  className: PropTypes.string,
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    primaryImage: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
    }),
  }),
  imgAttrs: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  tag: PropTypes.string,
};

const defaultProps = {
  children: v => v,
  className: null,
  collapsible: true,
  content: {},
  imgAttrs: {},
  tag: 'div',
};

const PrimaryImage = ({
  children,
  className,
  collapsible,
  content,
  imgAttrs,
  tag: Tag,
  ...attrs
}) => {
  const primaryImage = getAsObject(content, 'primaryImage');
  const { src, alt } = primaryImage;
  const render = isFn(children) ? children : defaultProps.children;
  if (collapsible && (!src || !alt)) return null;
  const image = <img src={src} alt={alt} {...imgAttrs} />;
  return (
    <Tag className={classNames(modelClassNames('content', 'primaryImage'), className)} {...attrs}>
      {render(image)}
    </Tag>
  );
};

PrimaryImage.displayName = 'Content/Elements/PrimaryImage';
PrimaryImage.propTypes = propTypes;
PrimaryImage.defaultProps = defaultProps;

export default PrimaryImage;
