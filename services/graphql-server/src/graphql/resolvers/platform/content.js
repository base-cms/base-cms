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
};
