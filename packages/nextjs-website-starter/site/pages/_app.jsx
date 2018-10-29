import { WebsiteApp, withApollo } from '@base-cms/base4-website-nextjs/app';
import { withSiteConfig } from '@base-cms/base4-website-nextjs/config';
import { withRouting } from '@base-cms/base4-website-nextjs/routing';
import routeDefs from '../routes';
import config from '../../site.config';

export default withApollo(
  withRouting(routeDefs)(
    withSiteConfig(config)(
      WebsiteApp
    )
  )
);
