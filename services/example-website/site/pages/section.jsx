import React from 'react';
import PropTypes from 'prop-types';
import { withWebsiteSection, withLayout } from '@base-cms/nextjs-web/hoc';
import {
  Name,
  Description,
  Wrapper,
} from '@base-cms/nextjs-web/components/website-section';
import DefaultLayout from '../layouts/Default';


const SectionPage = ({ section }) => (
  <Wrapper section={section}>
    <Name section={section} />
    <Description tag="p" section={section} />
  </Wrapper>
);

SectionPage.propTypes = {
  section: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default withLayout(DefaultLayout)(
  withWebsiteSection()(
    SectionPage,
  ),
);
