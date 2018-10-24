import RoutingContext from './routing/context';
import { Link, Router } from './routing/Components';

const redirect = (router, res, route, code = 301) => {
  if (res) {
    // Server-side only.
    res.writeHead(code, { Location: route });
    res.end();
  } else {
    // Client-side.
    router.replaceRoute(route);
  }
};

export default RoutingContext;
export {
  redirect,
  Link,
  Router,
};
