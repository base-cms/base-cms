const { SchemaDirectiveVisitor } = require('graphql-tools');
const { get } = require('@base-cms/object-path');

class MutatedValueDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (doc, { input } = {}) => {
      const { localField } = this.args;
      const fieldKey = localField || field.name;
      const value = get(doc, fieldKey);

      const { mutation } = input;
      if (!mutation) return value;

      const mutated = get(doc, `mutations.${mutation}.${fieldKey}`);
      return mutated || value;
    };
  }
}

module.exports = MutatedValueDirective;
