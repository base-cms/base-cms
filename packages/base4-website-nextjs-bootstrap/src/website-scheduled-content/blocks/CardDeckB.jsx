import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { WebsiteScheduledContent } from '@base-cms/base4-website-nextjs/queries';
import { asArray } from '@base-cms/base4-website-nextjs/utils';
import { Card } from '../../core';
import { CardBodyC } from '../../content';

const fragment = CardBodyC.fragments.content;

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

const BlockCardDeckB = ({
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

        const nodes = asArray(items);
        return (
          <div className="row" {...attrs}>
            {nodes.map(content => (
              <Fragment key={content.id}>
                <div className="mb-3 col-12 col-md-6 col-lg-3">
                  <Card className="h-100">
                    <CardBodyC content={content} />
                  </Card>
                </div>
              </Fragment>
            ))}
          </div>
        );
      }}
    </WebsiteScheduledContent>
  );
};

BlockCardDeckB.displayName = 'WebsiteScheduledContent/Blocks/CardDeckB';
BlockCardDeckB.propTypes = propTypes;
BlockCardDeckB.defaultProps = defaultProps;

export default BlockCardDeckB;
