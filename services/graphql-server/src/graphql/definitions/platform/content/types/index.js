const gql = require('graphql-tag');
const article = require('./article');
const blog = require('./blog');
const contact = require('./contact');
const pressRelease = require('./press-release');

module.exports = gql`

${article}
${blog}
${contact}
${pressRelease}

`;
