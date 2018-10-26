import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { get } from 'object-path';
import FieldValue from '../FieldValue';
import Link from '../Link';
import canonicalPathFragment from '../../../gql/fragments/content-canonical-path.graphql';

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
ContentLinkShortName.fragments = {
  content: gql`
    fragment PlatformContentLinkShortName on PlatformContent {
      shortName
      ...ContentCanonicalPath
    }
    ${canonicalPathFragment}
  `,
};

export default ContentLinkShortName;
