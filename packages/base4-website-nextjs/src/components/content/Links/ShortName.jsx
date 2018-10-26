import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'object-path';
import FieldValue from '../Elements/FieldValue';
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

const ContentLinkShortName = ({ content, linkAttrs, ...attrs }) => (
  <FieldValue path="shortName" data={content} {...attrs}>
    {(value) => {
      const canonicalPath = get(content, 'canonicalPath');
      if (!canonicalPath) return null;
      return <Link asHTML canonicalPath={canonicalPath} value={value} {...linkAttrs} />;
    }}
  </FieldValue>
);

ContentLinkShortName.propTypes = propTypes;
ContentLinkShortName.defaultProps = defaultProps;

export default ContentLinkShortName;
