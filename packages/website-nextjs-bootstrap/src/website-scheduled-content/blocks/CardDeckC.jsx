import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import { WebsiteScheduledContent } from '@base-cms/base4-website-nextjs/queries';
import { isFunction as isFn, asArray } from '@base-cms/base4-website-nextjs/utils';
import { Card } from '../../core';
import { CardBodyA, ListGroupC } from '../../content';

const fragment = gql`
  fragment ContentBlockCardDeckC on PlatformContent {
    ...ContentListGroupStyleC
    ...ContentCardBodyStyleA
  }
  ${CardBodyA.fragments.content}
  ${ListGroupC.fragments.content}
`;

const propTypes = {
  ad1: PropTypes.func,
  ad2: PropTypes.func,
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
  ad1: v => v,
  ad2: v => v,
  query: {},
};

const BlockCardDeckC = ({
  query,
  ad1,
  ad2,
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
        const set1 = nodes.slice(0, 8) || [];
        const set2 = nodes.slice(8) || [];

        const renderAd1 = isFn(ad1) ? ad1 : defaultProps.ad1;
        const renderAd2 = isFn(ad2) ? ad2 : defaultProps.ad2;
        return (
          <Fragment>
            <div className="row" {...attrs}>
              {set1.map((content, index) => (
                <Fragment key={content.id}>
                  <div className="mb-3 col-12 col-lg-6 col-xl-4">
                    <Card className="h-100">
                      <CardBodyA content={content} />
                    </Card>
                  </div>
                  {index === 3 && (
                    <div className="mb-3 col-12 col-lg-6 col-xl-4 d-flex justify-content-center align-items-center">
                      {renderAd1()}
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
            <div className="row">
              <div className="col-lg-4 mb-3 d-flex justify-content-center align-items-center">
                {renderAd2()}
              </div>
              <div className="col-lg-8">
                <Card>
                  <ListGroupC flush nodes={set2} />
                </Card>
              </div>
            </div>
          </Fragment>
        );
      }}
    </WebsiteScheduledContent>
  );
};

BlockCardDeckC.displayName = 'WebsiteScheduledContent/Blocks/CardDeckC';
BlockCardDeckC.propTypes = propTypes;
BlockCardDeckC.defaultProps = defaultProps;

export default BlockCardDeckC;
