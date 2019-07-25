module.exports = {
  /**
   *
   */
  Mutation: {
    /**
     *
     */
    createInquirySubmission: async (_, { input }, { basedb }) => {
      const { payload, addresses, contentId } = input;
      const document = {
        payload,
        created: new Date(),
        contentId,
        addresses,
      };
      await basedb.insertOne('website.InquirySubmission', document);
      return document;
    },
  },
};
