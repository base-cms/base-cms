import React from 'react';
import nextRoutes from 'next-routes';
import RoutingContext from './context';

const once = (fn) => {
  let called = false;
  let result;
  return (...args) => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
};

const createRoutes = once((defs) => {
  const routes = nextRoutes();
  defs.forEach(def => routes.add(def));
  return routes;
});

const Link = props => (
  <RoutingContext.Consumer>
    {(definitions) => {
      const routes = createRoutes(definitions);
      const { Link: NextLink } = routes;
      return <NextLink {...props} />;
    }}
  </RoutingContext.Consumer>
);

const Router = props => (
  <RoutingContext.Consumer>
    {(definitions) => {
      const routes = createRoutes(definitions);
      const { Router: NextRouter } = routes;
      return <NextRouter {...props} />;
    }}
  </RoutingContext.Consumer>
);

export { Link, Router };
