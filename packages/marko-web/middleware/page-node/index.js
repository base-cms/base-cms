const { getAsObject } = require('@base-cms/object-path');
const ResolvedNode = require('./resolved');

const createNode = data => new ResolvedNode(data);

class PageNode {
  constructor(apolloClient, {
    queryFactory,
    queryFragment,
    variables,
    resultField,
  }) {
    this.apolloClient = apolloClient;
    this.queryFactory = queryFactory;
    this.queryFragment = queryFragment;
    this.variables = variables;
    this.resultField = resultField;
  }

  async load() {
    if (!this.promise) {
      const { queryFragment, variables, resultField } = this;
      const path = `data.${resultField}`;
      const query = this.queryFactory({ queryFragment, queryName: 'PageNode' });
      this.promise = this.apolloClient.query({ query, variables })
        .then(r => createNode(getAsObject(r, path)));
    }
    return this.promise;
  }
}

module.exports = PageNode;
