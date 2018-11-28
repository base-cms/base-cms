const gql = require('graphql-tag');

module.exports = gql`

interface Media {
  # fields from platform.model::Content\Media
  fileName: String
  filePath: String
  sourceFilename: String
  sourceFile: String
  contacts(input: MediaContactsInput = {}): ContentContactConnection! @refMany(model: "platform.Content", criteria: "contentContact")
}

input MediaContactsInput {
  status: ModelStatus = active
  sort: ContentContactSortInput = {}
  pagination: PaginationInput = {}
}

`;
