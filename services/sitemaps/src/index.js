const micro = require('micro');
const AWS = require('aws-sdk');
const { AWS_S3_BUCKET: Bucket, AWS_S3_REGION, AWS_S3_PREFIX } = require('./env');

const s3 = new AWS.S3({ region: AWS_S3_REGION });
const getObject = i => new Promise((res, rej) => s3.getObject(i, (e, d) => (e ? rej(e) : res(d))));

const handle = async (res, url) => {
  const Key = `${AWS_S3_PREFIX}${url}`;
  try {
    const { Body, ETag, LastModified } = await getObject({ Bucket, Key });
    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('ETag', ETag);
    res.setHeader('Last-Modified', LastModified);
    res.end(Body);
  } catch (e) {
    throw micro.createError(e.statusCode, e.message);
  }
};

const server = micro(async (req, res) => {
  if (/^\/sitemap(.xml|-google-news.xml|\/.+.xml)$/.test(req.url)) return handle(res, req.url);
  throw micro.createError(404, 'Not found');
});

server.listen(80);
