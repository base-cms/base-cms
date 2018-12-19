import '../styles/app.scss';
import {
  WebsiteApp,
  withApollo,
  withRouting,
  withSiteConfig,
} from '@base-cms/nextjs-web/app';
import routeDefs from '../routes';
import config from '../config';

export default withApollo(
  withRouting(routeDefs)(
    withSiteConfig(config)(
      WebsiteApp,
    ),
  ),
);
