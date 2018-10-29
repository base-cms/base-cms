import React from 'react';
import PropTypes from 'prop-types';
import ObjectValue from '../Elements/ObjectValue';
import ObjectValueCollection from '../../core/Collections/ObjectValue';

const propTypes = {
  children: PropTypes.func,
  collapsible: PropTypes.bool,
  elementAttrs: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  path: PropTypes.oneOf(['authors', 'contributors', 'photographers']).isRequired,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

const defaultProps = {
  children: undefined,
  collapsible: true,
  elementAttrs: {},
  tag: 'div',
};

const ContactFullNameLinks = ({
  children,
  collapsible,
  content,
  path,
  elementAttrs,
  ...attrs
}) => (
  <ObjectValue path={`${path}.edges`} obj={content} collapsible={collapsible} {...attrs}>
    {edges => (
      <ObjectValueCollection path="node.fullName" objs={edges} collapsible={collapsible} {...elementAttrs}>
        {children}
      </ObjectValueCollection>
    )}
  </ObjectValue>
);

ContactFullNameLinks.displayName = 'Content/Links/ContactFullNames';
ContactFullNameLinks.propTypes = propTypes;
ContactFullNameLinks.defaultProps = defaultProps;

export default ObjectValueCollection;
