const gql = require('graphql-tag');

module.exports = gql`

interface Media {
  # fields from platform.model::Content\Media
  fileName: String @projection
  filePath: String @projection
  sourceFilename: String @projection
  sourceFile: String @projection
  contacts(input: MediaContactsInput = {}): ContentContactConnection! @projection @refMany(model: "platform.Content", criteria: "contentContact")

  # GraphQL specific fields
  fileSrc: String @projection(localField: "fileName", needs: ["filePath"])
}

input MediaContactsInput {
  status: ModelStatus = active
  sort: ContentContactSortInput = {}
  pagination: PaginationInput = {}
}

`;
