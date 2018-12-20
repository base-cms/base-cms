import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import { WebsiteScheduledContent } from '@base-cms/nextjs-web/queries';
import { Card } from '../../core';
import { CardBodyB, ListGroupA } from '../../content';

const fragment = gql`
  fragment ContentBlockListGroupB on Content {
    ...ContentListGroupStyleA
    ...ContentCardBodyStyleB
  }
  ${CardBodyB.fragments.content}
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

const BlockListGroupB = ({
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
            <CardBodyB content={content} imgAttrs={{ className: header ? 'rounded-0' : null }} />
            <ListGroupA flush nodes={nodes} />
          </Card>
        );
      }}
    </WebsiteScheduledContent>
  );
};

BlockListGroupB.displayName = 'WebsiteScheduledContent/Blocks/ListGroupB';
BlockListGroupB.propTypes = propTypes;
BlockListGroupB.defaultProps = defaultProps;

export default BlockListGroupB;
