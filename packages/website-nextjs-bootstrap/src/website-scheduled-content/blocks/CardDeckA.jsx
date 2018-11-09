import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { WebsiteScheduledContent } from '@base-cms/base4-website-nextjs/queries';
import { isFunction as isFn, asArray } from '@base-cms/base4-website-nextjs/utils';
import { Card } from '../../core';
import { CardBodyA } from '../../content';

const fragment = CardBodyA.fragments.content;

const propTypes = {
  interstitial: PropTypes.func,
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
  interstitial: v => v,
  query: {},
};

const BlockCardDeckA = ({
  query,
  interstitial,
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
        const renderInter = isFn(interstitial) ? interstitial : defaultProps.interstitial;
        return (
          <div className="row" {...attrs}>
            {nodes.map((content, index) => (
              <Fragment key={content.id}>
                <div className="mb-3 col-12 col-lg-6 col-xl-4">
                  <Card className="h-100">
                    <CardBodyA content={content} />
                  </Card>
                </div>
                {index === 3 && (
                  <div className="mb-3 col-12 col-lg-6 col-xl-4 d-flex justify-content-center align-items-center">
                    {renderInter()}
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        );
      }}
    </WebsiteScheduledContent>
  );
};

BlockCardDeckA.displayName = 'WebsiteScheduledContent/Blocks/CardDeckA';
BlockCardDeckA.propTypes = propTypes;
BlockCardDeckA.defaultProps = defaultProps;

export default BlockCardDeckA;
