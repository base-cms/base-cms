import React from 'react';
import PropTypes from 'prop-types';

import { WebsiteScheduledContent } from '@base-cms/base4-website-nextjs/queries';
import { Card } from '../../core';
import { ListGroupB } from '../../content';

const fragment = ListGroupB.fragments.content;

const propTypes = {
  header: PropTypes.string,
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
  header: null,
  query: {},
};

const BlockListGroupC = ({
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
          <Card {...attrs}>
            {header && (
              <div className="card-header">{header}</div>
            )}
            <ListGroupB flush nodes={items} />
          </Card>
        );
      }}
    </WebsiteScheduledContent>
  );
};

BlockListGroupC.displayName = 'WebsiteScheduledContent/Blocks/ListGroupC';
BlockListGroupC.propTypes = propTypes;
BlockListGroupC.defaultProps = defaultProps;

export default BlockListGroupC;
