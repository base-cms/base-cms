const { SchemaDirectiveVisitor } = require('graphql-tools');
const objectPath = require('object-path');

class ValueDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (doc) => {
      const { localField, fallbackField } = this.args;
      const value = objectPath.get(doc, localField || field.name);
      if (fallbackField && !value) return objectPath.get(doc, fallbackField);
      return value;
    };
  }
}

module.exports = ValueDirective;
