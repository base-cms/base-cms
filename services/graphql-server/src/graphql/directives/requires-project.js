/* eslint-disable no-param-reassign */
const { SchemaDirectiveVisitor } = require('graphql-tools');

class RequiresProjectDirective extends SchemaDirectiveVisitor {
  visitObject(object) {
    const { fields } = this.args;
    object.requiresProject = fields;
  }

  visitInterface(iface) {
    const { fields } = this.args;
    iface.requiresProject = fields;
  }
}

module.exports = RequiresProjectDirective;
