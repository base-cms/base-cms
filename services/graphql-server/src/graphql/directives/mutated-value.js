const { SchemaDirectiveVisitor } = require('graphql-tools');
const objectPath = require('object-path');

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
      const value = objectPath.get(doc, fieldKey);

      const { mutation } = input;
      if (!mutation) return value;

      const mutated = objectPath.get(doc, `mutations.${mutation}.${fieldKey}`);
      return mutated || value;
    };
  }
}

module.exports = MutatedValueDirective;
