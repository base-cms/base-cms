import Route from '@ember/routing/route';
import { RouteQueryManager } from 'ember-apollo-client';

import query from '@base-cms/manage-core/gql/queries/content/edit';

export default Route.extend(RouteQueryManager, {
  /**
   *
   * @param {object} params
   */
  model({ id }) {
    const input = {
      id: parseInt(id, 10),
      status: 'any',
    };
    const variables = { input };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'content');
  },
});
