import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import { WebsiteScheduledContent } from '@base-cms/nextjs-web/queries';
import { Card } from '../../core';
import { CardBodyA, ListGroupA } from '../../content';

const fragment = gql`
  fragment ContentBlockListGroupD on Content {
    ...ContentListGroupStyleA
    ...ContentCardBodyStyleA
  }
  ${CardBodyA.fragments.content}
  ${ListGroupA.fragments.content}
`;

const propTypes = {
  header: PropTypes.string,
  // @todo These should be placed here by a HOC.
  query: PropTypes.shape({
    after: PropTypes.string,
    children: PropTypes.func,
    excludeContentIds: PropTypes.arrayOf(PropTypes.string),
    excludeContentTypes: PropTypes.arrayOf(PropTypes.string),
    limit: PropTypes.number,
    includeContentTypes: PropTypes.arrayOf(PropTypes.string),
    requiresImage: PropTypes.bool,
    sectionBubbling: PropTypes.bool,
    sectionId: PropTypes.number.isRequired,
    optionId: PropTypes.number,
  }),
};

const defaultProps = {
  header: null,
  query: {},
};

const BlockListGroupD = ({
  header,
  query,
  ...attrs
}) => {
  const props = { ...query, fragment };
  return (
    <WebsiteScheduledContent {...props}>
      {({ loading, error, items }) => {
        if (loading) return <span>Loading...</span>;
        if (error) {
          return (
            <span>
              Error
              {' '}
              {error.message}
            </span>
          );
        }
        const content = items[0] || {};
        const nodes = items.slice(1) || [];
        return (
          <Card {...attrs}>
            {header && (
              <div className="card-header">{header}</div>
            )}
            <CardBodyA content={content} imgAttrs={{ className: header ? 'rounded-0' : null }} />
            <ListGroupA flush nodes={nodes} />
          </Card>
        );
      }}
    </WebsiteScheduledContent>
  );
};

BlockListGroupD.displayName = 'WebsiteScheduledContent/Blocks/ListGroupD';
BlockListGroupD.propTypes = propTypes;
BlockListGroupD.defaultProps = defaultProps;

export default BlockListGroupD;
