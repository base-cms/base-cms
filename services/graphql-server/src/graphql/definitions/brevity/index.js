const gql = require('graphql-tag');
const asset = require('./asset');
const author = require('./author');
const collection = require('./collection');
const issue = require('./issue');
const story = require('./story');

module.exports = gql`

${asset}
${author}
${collection}
${issue}
${story}

`;
