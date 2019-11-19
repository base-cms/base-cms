const { getAsArray } = require('@base-cms/object-path');

module.exports = {
  /**
   *
   */
  User: {
    name: ({ firstName, lastName }) => `${firstName} ${lastName}`,
    roles: user => getAsArray(user, 'roles'),
  },
};
