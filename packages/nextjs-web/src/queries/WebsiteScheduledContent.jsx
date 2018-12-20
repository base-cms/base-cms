import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { extractFragmentData } from '../utils';

export const buildQuery = ({ fragment }) => {
  const { spreadFragmentName, processedFragment } = extractFragmentData({ fragment });
  return gql`
    query WebsiteScheduledContent($input: WebsiteScheduledContentQueryInput!) {
      websiteScheduledContent(input: $input) {
        edges {
          node {
            id
            ${spreadFragmentName}
          }
        }
      }
    }
    ${processedFragment}
  `;
};

/**
 *
 */
const WebsiteScheduledContent = ({
  after,
  children,
  excludeContentIds,
  excludeContentTypes,
  limit,
  fragment,
  includeContentTypes,
  requiresImage,
  sectionBubbling,
  sectionId,
  optionId,
}) => {
  const pagination = { limit, after };
  const input = {
    pagination,
    excludeContentIds,
    excludeContentTypes,
    includeContentTypes,
    requiresImage,
    sectionBubbling,
    sectionId,
    optionId,
  };
  const query = buildQuery({ fragment });
  return (
    <Query query={query} variables={{ input }}>
      {({ loading, error, data }) => {
        let items = [];
        if (data && data.websiteScheduledContent) {
          items = data.websiteScheduledContent.edges
            .map(edge => (edge && edge.node ? edge.node : null))
            .filter(c => c);
        }
        return children({ loading, error, items });
      }}
    </Query>
  );
};

WebsiteScheduledContent.defaultProps = {
  after: null,
  children: () => {},
  excludeContentIds: [],
  excludeContentTypes: [],
  limit: 5,
  fragment: undefined,
  includeContentTypes: [],
  requiresImage: false,
  sectionBubbling: true,
  optionId: undefined,
};

WebsiteScheduledContent.propTypes = {
  after: PropTypes.string,
  children: PropTypes.func,
  excludeContentIds: PropTypes.arrayOf(PropTypes.string),
  excludeContentTypes: PropTypes.arrayOf(PropTypes.string),
  fragment: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  limit: PropTypes.number,
  includeContentTypes: PropTypes.arrayOf(PropTypes.string),
  requiresImage: PropTypes.bool,
  sectionBubbling: PropTypes.bool,
  sectionId: PropTypes.number.isRequired,
  optionId: PropTypes.number,
};

export default WebsiteScheduledContent;
