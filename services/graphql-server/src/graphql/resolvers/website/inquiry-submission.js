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
      const { ipAddress } = input;
      const clean = Object.keys(payload)
        .reduce((obj, key) => (payload[key] ? { ...obj, [key]: payload[key] } : obj), {});
      const document = {
        payload: clean,
        created: new Date(),
        contentId,
        ipAddress,
        addresses,
      };
      await basedb.insertOne('website.InquirySubmission', document);
      return document;
    },
  },
};
