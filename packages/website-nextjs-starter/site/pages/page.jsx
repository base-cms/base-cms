import React from 'react';
import PropTypes from 'prop-types';
import { withDynamicPage } from '@base-cms/website-nextjs/hoc';
import { withLayout } from '@base-cms/website-nextjs-bootstrap/layouts';
import {
  Body,
  Name,
  Wrapper,
} from '@base-cms/website-nextjs/components/dynamic-page';
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
