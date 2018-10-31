import React from 'react';
import PropTypes from 'prop-types';
import { get } from '../../../utils';
import PrimaryImage from '../Elements/PrimaryImage';
import Link from '../Link';

const propTypes = {
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    canonicalPath: PropTypes.string,
    primaryImage: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
    }),
  }),
  linkAttrs: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

const defaultProps = {
  collapsible: true,
  content: {},
  linkAttrs: {},
};

const PrimaryImageLink = ({
  collapsible,
  content,
  linkAttrs,
  ...attrs
}) => {
  const canonicalPath = get(content, 'canonicalPath');
  if (collapsible && !canonicalPath) return null;
  return (
    <PrimaryImage content={content} collapsible={collapsible} {...attrs}>
      {image => (
        <Link canonicalPath={canonicalPath} collapsible={false} {...linkAttrs}>
          {() => image}
        </Link>
      )}
    </PrimaryImage>
  );
};

PrimaryImageLink.displayName = 'Content/Links/PrimaryImage';
PrimaryImageLink.propTypes = propTypes;
PrimaryImageLink.defaultProps = defaultProps;

export default PrimaryImageLink;
