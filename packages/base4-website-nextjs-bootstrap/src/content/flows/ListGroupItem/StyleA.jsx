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

const ListGroupItemStyleA = ({ content }) => {
  const node = content || {};
  const { id, type } = node;
  return content.id ? (
    <ListGroupItem id={id} type={type}>
      <ShortNameLink content={node} className="mb-1" />
      <CompanyLink content={node} tag="small" className="d-block" prefix="From " />
      <Row tag="small">
        <PrimarySectionNameLink content={node} className="mr-2" />
        <PublishedDate content={node} />
      </Row>
    </ListGroupItem>
  ) : null;
};

ListGroupItemStyleA.displayName = 'Content/Flows/ListGroupItem/StyleA';
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
