import React from 'react';
import RoutingContext from './context';

const Link = props => (
  <RoutingContext.Consumer>
    {({ Link: NextLink }) => <NextLink {...props} />}
  </RoutingContext.Consumer>
);

const Router = props => (
  <RoutingContext.Consumer>
    {({ Router: NextRouter }) => <NextRouter {...props} />}
  </RoutingContext.Consumer>
);

export { Link, Router };
