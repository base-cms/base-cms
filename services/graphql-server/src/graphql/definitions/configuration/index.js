const gql = require('graphql-tag');
const email = require('./email');
const theme = require('./theme');

module.exports = gql`

${email}
${theme}

`;
