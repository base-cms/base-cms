const gql = require('graphql-tag');

module.exports = gql`

interface Gateable {
  gating: ContentGating! @projection(localField: "mutations.Website.gating") @value(localField: "mutations.Website.gating")
}

enum GateableUserRole {
  ROLE_REGISTERED
}

enum GateableSurveyProvider {
  wufoo
  idme
  form_dot_com
}

type ContentGating {
  requiredRole: GateableUserRole
  surveyType: GateableSurveyProvider
  surveyId: String
}

`;
