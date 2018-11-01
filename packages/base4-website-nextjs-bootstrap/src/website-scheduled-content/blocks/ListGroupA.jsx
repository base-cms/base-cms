import React from 'react';
import PropTypes from 'prop-types';

import { WebsiteScheduledContent } from '@base-cms/base4-website-nextjs/queries';
import { ListGroupA } from '../../content';
import { Card } from '../../core';

const fragment = ListGroupA.fragments.content;

const propTypes = {
  // @todo These should be placed here by a HOC.
  query: PropTypes.shape({
    after: PropTypes.string,
    children: PropTypes.func,
    excludeContentIds: PropTypes.arrayOf(PropTypes.string),
    excludeContentTypes: PropTypes.arrayOf(PropTypes.string),
    first: PropTypes.number,
    includeContentTypes: PropTypes.arrayOf(PropTypes.string),
    requiresImage: PropTypes.bool,
    sectionBubbling: PropTypes.bool,
    sectionId: PropTypes.number.isRequired,
  }),
};

const defaultProps = {
  query: {},
};

const BlockListGroupA = ({
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
        return (
          <Card>
            {header && (
              <div className="card-header">{header}</div>
            )}
            <ListGroupA flush nodes={items} {...attrs} />
          </Card>
        );
      }}
    </WebsiteScheduledContent>
  );
};

BlockListGroupA.displayName = 'WebsiteScheduledContent/Blocks/ListGroupA';
BlockListGroupA.propTypes = propTypes;
BlockListGroupA.defaultProps = defaultProps;

export default BlockListGroupA;
