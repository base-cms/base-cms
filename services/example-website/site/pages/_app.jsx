import {
  WebsiteApp,
  WithApollo,
  WithRouting,
} from '@base-cms/nextjs-web/app';
import routeDefs from '../routes';

export default WithApollo(
  WithRouting(routeDefs)(
    WebsiteApp,
  ),
);
