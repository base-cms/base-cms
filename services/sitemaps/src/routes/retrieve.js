const micro = require('micro');
const { getObject, Prefix } = require('../db/s3');

/**
 * Returns a sitemap from S3, if present
 */
module.exports = async (res, url) => {
  const Key = `${Prefix}${url}`;
  try {
    const { Body, ETag, LastModified } = await getObject({ Key });
    res.setHeader('X-Robots-Tag', 'noindex');
    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('ETag', ETag);
    res.setHeader('Last-Modified', LastModified);
    res.end(Body);
  } catch (e) {
    throw micro.createError(e.statusCode, e.message);
  }
};
