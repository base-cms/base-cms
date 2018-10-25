import React, { Component } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { Router } from './Components';
import { componentDisplayName } from '../utils';


export default (ComposedComponent) => {
  class WithRouter extends Component {
    /**
     *
     * @param {object} args
     */
    static async getInitialProps(args) {
      // Add the router to initial props context, if applicable.
      // eslint-disable-next-line no-param-reassign
      if (args && args.ctx) args.ctx.router = Router;

      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(args);
      }
      return composedInitialProps;
    }

    /**
     *
     */
    render() {
      const props = {
        router: Router,
        ...this.props,
      };
      return <ComposedComponent {...props} />;
    }
  }
  WithRouter.displayName = `withRouter(${componentDisplayName(ComposedComponent)})`;
  return hoistStatics(WithRouter, ComposedComponent);
};
