const gql = require('graphql-tag');

module.exports = gql`

type BrevityAssetImage {
  filePath: String @projection
  fileName: String @projection
  uri: String @projection
  src(input: AssetImageSrcInput = {}): String! @projection(localField: "fileName", needs: ["filePath"])
}

type BrevityAssetVideo {
  src: String @projection
  format: String @projection
}

`;
