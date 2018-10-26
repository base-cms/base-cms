import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'object-path';
import FieldValue from '../Elements/FieldValue';
import Link from '../Link';

const propTypes = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  content: PropTypes.shape({
    shortName: PropTypes.string,
    canonicalPath: PropTypes.string,
  }),
  linkAttrs: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  tag: PropTypes.string,
};

const defaultProps = {
  children: undefined,
  collapsible: true,
  content: {},
  linkAttrs: {},
  tag: 'span',
};

const ContentLinkCompanyName = ({
  children,
  content,
  linkAttrs,
  ...attrs
}) => (
  <FieldValue path="company.name" data={content} {...attrs}>
    {(value) => {
      const canonicalPath = get(content, 'company.canonicalPath');
      if (!canonicalPath) return null;
      return (
        <Link canonicalPath={canonicalPath} value={value} {...linkAttrs}>
          {children}
        </Link>
      );
    }}
  </FieldValue>
);

ContentLinkCompanyName.propTypes = propTypes;
ContentLinkCompanyName.defaultProps = defaultProps;

export default ContentLinkCompanyName;
