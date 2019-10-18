const gql = require('graphql-tag');

module.exports = gql`

interface PrimaryCategory {
  primaryCategory(input: PrimaryCategoryInput = {}): Taxonomy
    @projection(localField: "mutations.Website.primaryCategory")
    @refOne(
      loader: "platformTaxonomy",
      localField: "mutations.Website.primaryCategory",
      criteria: "taxonomyCategory",
    )
}

input PrimaryCategoryInput {
  status: ModelStatus = active
}

`;
