/* eslint-disable no-param-reassign */
const { SchemaDirectiveVisitor } = require('graphql-tools');

class DeprecatedDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    field.isDeprecated = true;
    field.deprecationReason = this.args.reason;
  }

  /**
   *
   * @param {*} value
   */
  visitEnumValue(value) {
    value.isDeprecated = true;
    value.deprecationReason = this.args.reason;
  }
}

module.exports = DeprecatedDirective;
