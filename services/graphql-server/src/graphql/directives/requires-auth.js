/* eslint-disable no-param-reassign */
const { SchemaDirectiveVisitor } = require('graphql-tools');
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');

class RequiresAuthDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    const { resolve } = field;
    const { role } = this.args;
    field.resolve = async (_, input, context, ...args) => {
      const { user } = context;
      if (!user.isAuthenticated()) throw new AuthenticationError('Authentication is required');
      if (role && !user.hasRole(role)) throw new ForbiddenError(`Role ${role} is required`);
      return resolve(_, input, context, ...args);
    };
  }
}

module.exports = RequiresAuthDirective;
