const gql = require('graphql-tag');

module.exports = gql`

input AuthorableAuthorsInput {
  status: ModelStatus = active
  sort: ContentContactSortInput = {}
  pagination: PaginationInput = {}
}

input AuthorableContributorsInput {
  status: ModelStatus = active
  sort: ContentContactSortInput = {}
  pagination: PaginationInput = {}
}

input AuthorablePhotographersInput {
  status: ModelStatus = active
  sort: ContentContactSortInput = {}
  pagination: PaginationInput = {}
}

interface Authorable {
  authors(input: AuthorableAuthorsInput = {}): ContentContactConnection! @refMany(model: "platform.Content" criteria: "contentContact")
  contributors(input: AuthorableContributorsInput = {}): ContentContactConnection! @refMany(model: "platform.Content" criteria: "contentContact")
  photographers(input: AuthorablePhotographersInput = {}): ContentContactConnection! @refMany(model: "platform.Content" criteria: "contentContact")
}

`;
