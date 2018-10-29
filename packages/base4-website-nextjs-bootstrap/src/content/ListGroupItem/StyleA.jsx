import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import {
  CompanyLink,
  PrimarySectionNameLink,
  PublishedDate,
  Row,
  ShortNameLink,
} from '@base-cms/base4-website-nextjs/components/content';
import ListGroupItem from '../ListGroupItem';

const propTypes = {
  content: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    shortName: PropTypes.string,
    canonicalPath: PropTypes.string,
    published: PropTypes.number,
    company: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      canonicalPath: PropTypes.string,
    }),
    primarySection: PropTypes.shape({
      id: PropTypes.number,
      alias: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
};

const defaultProps = {
  content: {},
};

const ListGroupItemStyleA = ({ content, ...attr }) => (
  <ListGroupItem content={content} {...attr}>
    <ShortNameLink content={content} className="mb-1" />
    <CompanyLink content={content} tag="small" className="d-block" prefix="From " />
    <Row tag="small">
      <PrimarySectionNameLink content={content} className="mr-2" />
      <PublishedDate content={content} />
    </Row>
  </ListGroupItem>
);

ListGroupItemStyleA.displayName = 'Content/ListGroupItem/StyleA';
ListGroupItemStyleA.propTypes = propTypes;
ListGroupItemStyleA.defaultProps = defaultProps;
ListGroupItemStyleA.fragments = {
  content: gql`
    fragment ContentListGroupItemStyleA on PlatformContent {
      id
      type
      shortName
      published
      canonicalPath(input: { fields: $canonicalFields })
      primarySection {
        id
        name
        alias
      }
      ... on PlatformContentProduct {
        company {
          id
          name
          canonicalPath(input: { fields: $canonicalFields }) })
        }
      }
    }
  `,
};

export default ListGroupItemStyleA;
