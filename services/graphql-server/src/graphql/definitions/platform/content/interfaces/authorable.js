const gql = require('graphql-tag');

module.exports = gql`

interface Authorable {
  authors(input: AuthorableAuthorsInput = {}): ContentContactConnection! @projection @refMany(model: "platform.Content" criteria: "contentContact")
  contributors(input: AuthorableContributorsInput = {}): ContentContactConnection! @projection @refMany(model: "platform.Content" criteria: "contentContact")
  photographers(input: AuthorablePhotographersInput = {}): ContentContactConnection! @projection @refMany(model: "platform.Content" criteria: "contentContact")
}

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

`;
