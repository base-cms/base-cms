import {
  WebsiteApp,
  WithApollo,
  WithRouting,
  WithSiteConfig,
} from '@base-cms/nextjs-web/app';
import routeDefs from '../routes';
import config from '../config';

export default WithApollo(
  WithRouting(routeDefs)(
    WithSiteConfig(config)(
      WebsiteApp,
    ),
  ),
);
