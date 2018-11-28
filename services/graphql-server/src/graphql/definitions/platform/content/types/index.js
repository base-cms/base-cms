const gql = require('graphql-tag');
const article = require('./article');
const blog = require('./blog');
const company = require('./company');
const contact = require('./contact');
const pressRelease = require('./press-release');

module.exports = gql`

${article}
${blog}
${company}
${contact}
${pressRelease}

`;
