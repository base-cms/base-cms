import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'object-path';
import ObjectValue from '../Elements/ObjectValue';
import Link from '../Link';

const propTypes = {
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    shortName: PropTypes.string,
    canonicalPath: PropTypes.string,
  }),
  linkAttrs: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  tag: PropTypes.string,
};

const defaultProps = {
  collapsible: true,
  content: {},
  linkAttrs: {},
  tag: 'h5',
};

const ShortNameLink = ({ content, linkAttrs, ...attrs }) => (
  <ObjectValue path="shortName" obj={content} {...attrs}>
    {(value) => {
      const canonicalPath = get(content, 'canonicalPath');
      if (!canonicalPath) return null;
      return <Link asHTML canonicalPath={canonicalPath} value={value} {...linkAttrs} />;
    }}
  </ObjectValue>
);

ShortNameLink.displayName = 'Content/Links/ShortName';
ShortNameLink.propTypes = propTypes;
ShortNameLink.defaultProps = defaultProps;

export default ShortNameLink;
