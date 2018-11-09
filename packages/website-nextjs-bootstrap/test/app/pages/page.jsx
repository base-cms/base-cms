import React from 'react';
import PropTypes from 'prop-types';
import { withDynamicPage } from '@base-cms/website-nextjs/hoc';
import {
  Body,
  Name,
  Wrapper,
} from '@base-cms/website-nextjs/components/dynamic-page';
import withLayout from '../../../src/layouts/withLayout';
import DefaultLayout from '../layouts/Default';

const DynamicPage = ({ page }) => (
  <Wrapper page={page}>
    <Name page={page} />
    <Body page={page} />
  </Wrapper>
);

DynamicPage.propTypes = {
  page: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default withLayout(DefaultLayout)(
  withDynamicPage(
    DynamicPage,
  ),
);
