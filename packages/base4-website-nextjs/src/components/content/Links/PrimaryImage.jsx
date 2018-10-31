import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getAsObject, modelClassNames, get } from '../../../utils';
import Link from '../Link';

const propTypes = {
  className: PropTypes.string,
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    canonicalPath: PropTypes.string,
    primaryImage: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
    }),
  }),
  imgAttrs: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  linkAttrs: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  tag: PropTypes.string,
};

const defaultProps = {
  className: null,
  collapsible: true,
  content: {},
  imgAttrs: {},
  linkAttrs: {},
  tag: 'div',
};

const PrimaryImageLink = ({
  className,
  collapsible,
  content,
  imgAttrs,
  linkAttrs,
  tag: Tag,
  ...attrs
}) => {
  const canonicalPath = get(content, 'canonicalPath');
  const primaryImage = getAsObject(content, 'primaryImage');
  const { src, alt } = primaryImage;
  if (collapsible && (!src || !alt)) return null;

  const image = <img src={src} alt={alt} {...imgAttrs} />;
  return (
    <Tag className={classNames(modelClassNames('content', 'primaryImage'), className)} {...attrs}>
      {canonicalPath ? (
        <Link canonicalPath={canonicalPath} {...linkAttrs}>
          {() => image}
        </Link>
      ) : image}
    </Tag>
  );
};

PrimaryImageLink.displayName = 'Content/Links/PrimaryImage';
PrimaryImageLink.propTypes = propTypes;
PrimaryImageLink.defaultProps = defaultProps;

export default PrimaryImageLink;
