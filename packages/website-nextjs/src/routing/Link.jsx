import React from 'react';
import RoutingContext from './context';

export default props => (
  <RoutingContext.Consumer>
    {({ Link: NextLink }) => <NextLink {...props} />}
  </RoutingContext.Consumer>
);
