const gql = require('graphql-tag');
const apparatus = require('./apparatus');
const article = require('./article');
const blog = require('./blog');
const collection = require('./collection');
const company = require('./company');
const contact = require('./contact');
const document = require('./document');
const ebook = require('./ebook');
const engineSpec = require('./engine-spec');
const event = require('./event');
const group = require('./group');
const inQuarters = require('./in-quarters');
const infographic = require('./infographic');
const job = require('./job');
const mediaGallery = require('./media-gallery');
const news = require('./news');
const page = require('./page');
const podcast = require('./podcast');
const pressRelease = require('./press-release');
const product = require('./product');
const productExternal = require('./product-external');
const promotion = require('./promotion');
const review = require('./review');
const sponsored = require('./sponsored');
const textAd = require('./text-ad');
const video = require('./video');
const webinar = require('./webinar');
const whitepaper = require('./whitepaper');

module.exports = gql`

${apparatus}
${article}
${blog}
${collection}
${company}
${contact}
${document}
${ebook}
${engineSpec}
${event}
${group}
${inQuarters}
${infographic}
${job}
${mediaGallery}
${news}
${page}
${podcast}
${pressRelease}
${product}
${productExternal}
${promotion}
${review}
${sponsored}
${textAd}
${video}
${webinar}
${whitepaper}

`;
