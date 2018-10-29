import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'object-path';
import ObjectValue from '../Elements/ObjectValue';
import ObjectValueCollection from '../../core/Collections/ObjectValue';
import Link from '../Link';

const propTypes = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  elementAttrs: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  linkAttrs: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  path: PropTypes.oneOf(['authors', 'contributors', 'photographers']).isRequired,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

const defaultProps = {
  children: undefined,
  collapsible: true,
  elementAttrs: {},
  linkAttrs: {},
  tag: 'div',
};

const ContactFullNameLinks = ({
  children,
  collapsible,
  content,
  path,
  elementAttrs,
  linkAttrs,
  ...attrs
}) => (
  <ObjectValue path={`${path}.edges`} obj={content} collapsible={collapsible} {...attrs}>
    {edges => (
      <ObjectValueCollection path="node.fullName" objs={edges} collapsible={collapsible} {...elementAttrs}>
        {(fullName, contact) => {
          const canonicalPath = get(contact, 'canonicalPath');
          if (!canonicalPath) return null;
          return (
            <Link canonicalPath={canonicalPath} value={fullName} {...linkAttrs}>
              {children}
            </Link>
          );
        }}
      </ObjectValueCollection>
    )}
  </ObjectValue>
);

ContactFullNameLinks.displayName = 'Content/Links/ContactFullNames';
ContactFullNameLinks.propTypes = propTypes;
ContactFullNameLinks.defaultProps = defaultProps;

export default ObjectValueCollection;
