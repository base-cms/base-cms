/* eslint-disable no-param-reassign */
const { SchemaDirectiveVisitor } = require('graphql-tools');

class ProjectUsingDirective extends SchemaDirectiveVisitor {
  visitObject(object) {
    const { type } = this.args;
    object.projectUsing = type;
  }
}

module.exports = ProjectUsingDirective;
