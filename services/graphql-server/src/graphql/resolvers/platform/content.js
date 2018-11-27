module.exports = {
  /**
   *
   */
  Content: {
    /**
     *
     */
    __resolveType(obj) {
      return `Content${obj.type}`;
    },
  },

  Authorable: {
    /**
     *
     */
    __resolveType(obj) {
      return `Content${obj.type}`;
    },
  },
};
