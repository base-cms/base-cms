module.exports = {
  /**
   *
   */
  Mutation: {
    /**
     *
     */
    createInquirySubmission: async (_, { input }, { basedb }) => {
      const { payload, addresses, content } = input;
      const {
        id: contentId,
        name: contentName,
        companyId,
        companyName,
      } = content;
      const document = {
        ...payload,
        created: new Date(),
        contentId,
        contentName,
        companyId,
        companyName,
        addresses,
      };
      await basedb.insertOne('platform.InquirySubmission', document);
      return document;
    },
  },
};
