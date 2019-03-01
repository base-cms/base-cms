const { SchemaDirectiveVisitor } = require('graphql-tools');
const { get } = require('@base-cms/object-path');

class ValueDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (doc) => {
      const { localField, fallbackField } = this.args;
      const value = get(doc, localField || field.name);
      if (fallbackField && !value) return get(doc, fallbackField);
      return value;
    };
  }
}

module.exports = ValueDirective;
