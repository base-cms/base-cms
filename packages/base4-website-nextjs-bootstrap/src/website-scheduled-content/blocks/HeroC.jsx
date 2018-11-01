import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import { WebsiteScheduledContent } from '@base-cms/base4-website-nextjs/queries';
import { Card } from '../../core';
import { CardBodyE, ListGroupA } from '../../content';

const fragment = gql`
  fragment ContentBlockHeroStyleA on PlatformContent {
    ...ContentListGroupStyleA
    ...ContentCardBodyStyleE
  }
  ${CardBodyE.fragments.content}
  ${ListGroupA.fragments.content}
`;

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

const BlockHeroC = ({
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
          <div className="row">
            <div className="col-lg-7 col-xl-8">
              <Card>
                <CardBodyE content={content} {...attrs} />
              </Card>
            </div>
            <div className="col-lg-5 col-xl-4">
              <Card>
                <ListGroupA flush nodes={nodes} {...attrs} />
              </Card>
            </div>
          </div>
        );
      }}
    </WebsiteScheduledContent>
  );
};

BlockHeroC.displayName = 'WebsiteScheduledContent/Blocks/HeroC';
BlockHeroC.propTypes = propTypes;
BlockHeroC.defaultProps = defaultProps;

export default BlockHeroC;
