import React from 'react';
import PropTypes from 'prop-types';
import { withDynamicPage, withLayout } from '@base-cms/nextjs-web/hoc';
import {
  Body,
  Name,
  Wrapper,
} from '@base-cms/nextjs-web/components/dynamic-page';
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
