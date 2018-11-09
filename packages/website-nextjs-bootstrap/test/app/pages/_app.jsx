import '../../../../../node_modules/bootstrap/scss/bootstrap.scss';
import {
  WebsiteApp,
  withApollo,
  withRouting,
  withSiteConfig,
} from '@base-cms/website-nextjs/app';
import routeDefs from '../routes';
import config from '../site.config';

export default withApollo(
  withRouting(routeDefs)(
    withSiteConfig(config)(
      WebsiteApp,
    ),
  ),
);
