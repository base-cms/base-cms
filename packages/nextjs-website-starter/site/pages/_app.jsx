import { WebsiteApp, withRouting, withApollo } from '@base-cms/base4-website-nextjs/pages';
import routeDefs from '../routes.json';

export default withApollo(withRouting(routeDefs)(WebsiteApp))
