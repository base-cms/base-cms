const { SchemaDirectiveVisitor } = require('graphql-tools');
const objectPath = require('object-path');

const { isArray } = Array;

class ArrayValueDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (doc) => {
      const { localField } = this.args;
      const value = objectPath.get(doc, localField || field.name);
      return isArray(value) ? value : [];
    };
  }
}

module.exports = ArrayValueDirective;
