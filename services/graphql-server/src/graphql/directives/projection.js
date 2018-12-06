const { SchemaDirectiveVisitor } = require('graphql-tools');

class ProjectionDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    const { localField, needs } = this.args;
    const name = localField || field.name;

    // eslint-disable-next-line no-param-reassign
    field.projection = needs.reduce((o, key) => ({ ...o, [key]: 1 }), { [name]: 1 });
  }
}

module.exports = ProjectionDirective;
