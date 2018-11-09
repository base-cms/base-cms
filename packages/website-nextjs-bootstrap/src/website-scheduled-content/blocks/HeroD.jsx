import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import { WebsiteScheduledContent } from '@base-cms/base4-website-nextjs/queries';
import { Card } from '../../core';
import { CardBodyA, ListGroupD } from '../../content';

const fragment = gql`
  fragment ContentBlockHeroStyleD on PlatformContent {
    ...ContentListGroupStyleD
    ...ContentCardBodyStyleA
  }
  ${CardBodyA.fragments.content}
  ${ListGroupD.fragments.content}
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

const BlockHeroD = ({
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
        const set1 = items.slice(0, 2) || [];
        const set2 = items.slice(2) || [];
        return (
          <div className="row" {...attrs}>
            {set1.map(content => (
              <div className="col-4" key={content.id}>
                <Card className="h-100">
                  <CardBodyA content={content} />
                </Card>
              </div>
            ))}
            <div className="col-4">
              <Card className="h-100">
                <ListGroupD flush nodes={set2} />
              </Card>
            </div>
          </div>
        );
      }}
    </WebsiteScheduledContent>
  );
};

BlockHeroD.displayName = 'WebsiteScheduledContent/Blocks/HeroD';
BlockHeroD.propTypes = propTypes;
BlockHeroD.defaultProps = defaultProps;

export default BlockHeroD;
