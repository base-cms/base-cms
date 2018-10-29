import RoutingContext from './routing/context';
import Link from './routing/Link';
import withRouting from './routing/withRouting';

const redirect = ({
  Router,
  res,
  route,
  code = 301,
} = {}) => {
  if (res) {
    // Server-side.
    res.writeHead(code, { Location: route });
    res.end();
  } else if (Router) {
    // Client-side.
    Router.replaceRoute(route);
  }
};

export {
  Link,
  RoutingContext,
  redirect,
  withRouting,
};
