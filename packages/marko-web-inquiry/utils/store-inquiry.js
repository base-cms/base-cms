const gql = require('graphql-tag');

const mutation = gql`
  mutation StoreInquirySubmission($input: CreateInquirySubmissionMutationInput!) {
    createInquirySubmission(input:$input){
      id
    }
  }
`;

module.exports = async ({
  apollo,
  addresses,
  contentId,
  payload,
}) => {
  const input = {
    addresses,
    contentId,
    payload,
  };
  return apollo.mutate({ mutation, variables: { input } });
};
