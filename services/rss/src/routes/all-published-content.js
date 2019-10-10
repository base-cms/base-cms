const { asyncRoute } = require('@base-cms/utils');
const gql = require('graphql-tag');
const createChannel = require('../utils/create-channel');
const createItem = require('../utils/create-item');
const contentFragment = require('../api/content-fragment');

module.exports = asyncRoute(async (req, res) => {
  const parts = [
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
  ];
  res.end(parts.join(''));
});
