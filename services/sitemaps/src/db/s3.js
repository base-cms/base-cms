const AWS = require('aws-sdk');

const {
  AWS_S3_BUCKET: Bucket,
  AWS_S3_REGION: region,
  AWS_S3_PREFIX: Prefix,
} = require('../env');

const promisify = (input, fn) => new Promise((resolve, reject) => fn(input,
  (err, data) => (err ? reject(err) : resolve(data))));

const s3 = new AWS.S3({ region });
const putObject = i => promisify({ Bucket, ...i }, s3.putObject.bind(s3));
const getObject = i => promisify({ Bucket, ...i }, s3.getObject.bind(s3));
const listObjects = i => promisify({ Bucket, ...i }, s3.listObjects.bind(s3));

module.exports = {
  getObject,
  putObject,
  listObjects,
  storeFile: (Body, file) => {
    // @todo Do NOT write the file if the contents are not different
    // retrieve and check first or...?
    const Key = `${Prefix}/${file}`;
    return putObject({ Body, Key });
  },
  Prefix,
  Bucket,
  region,
};
