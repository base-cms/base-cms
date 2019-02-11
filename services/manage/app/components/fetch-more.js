import Component from '@ember/component';
import { computed } from '@ember/object';
import { assign } from '@ember/polyfills';
import { isArray } from '@ember/array';

export default Component.extend({
  tagName: '',

  /**
   * The Apollo client query observable.
   * @type {Observable}
   */
  query: null,

  hasNextPage: false,
  endCursor: null,
  resultKey: null,
  applyToField: null,

  isFetching: false,

  nodes: computed('edges.@each.node', function() {
    const edges = this.get('edges');
    if (!isArray(edges)) return [];
    return edges.map(edge => edge.node);
  }),

  hasEvent(name) {
    const fn = this.get(name);
    return fn && typeof fn === 'function';
  },

  sendEvent(name, ...args) {
    if (this.hasEvent(name)) this.get(name)(...args, this);
  },

  actions: {
    /**
     * Fetches more results using the observable from the original query.
     * @see https://www.apollographql.com/docs/react/features/pagination.html
     */
    async fetchMore() {
      this.set('isFetching', true);
      this.sendEvent('on-fetch-start');
      const observable = this.get('query');
      const endCursor = this.get('endCursor');
      const resultKey = this.get('resultKey');
      const applyToField = this.get('applyToField');

      const updateQuery = (previous, { fetchMoreResult }) => {
        if (applyToField) {
          const { edges, pageInfo, totalCount } = fetchMoreResult[resultKey][applyToField];
          if (!edges.length) return previous;

          return {
            [resultKey]: {
              ...fetchMoreResult[resultKey],
              [applyToField]: {
                __typename: previous[resultKey][applyToField].__typename,
                totalCount,
                edges: [...previous[resultKey][applyToField].edges, ...edges],
                pageInfo,
              },
            },
          };

        }

        const { edges, pageInfo, totalCount } = fetchMoreResult[resultKey];
        if (!edges.length) return previous;
        return {
          [resultKey]: {
            __typename: previous[resultKey].__typename,
            totalCount,
            edges: [...previous[resultKey].edges, ...edges],
            pageInfo,
          },
        };
      };
      const pagination = assign({}, observable.variables.input.pagination, { after: endCursor });
      const input = { ...observable.variables.input, pagination };
      const variables = { input };
      try {
        const result = await observable.fetchMore({ updateQuery, variables });
        this.sendEvent('on-fetch-success', result);
        return result;
      } catch (e) {
        const evt = 'on-fetch-error';
        if (this.hasEvent(evt)) {
          this.sendEvent(evt, e);
        } else {
          throw e;
        }
      } finally {
        this.set('isFetching', false);
        this.sendEvent('on-fetch-end');
      }
    },
  },
});
