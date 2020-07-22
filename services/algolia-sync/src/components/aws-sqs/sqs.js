require('aws-sdk/clients/sqs');
const AWS = require('aws-sdk/global');
const algolia = require('../algolia/message-sync');
const cfg = require('./config');
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_AWS_REGION } = require('../../env');

// Create the SQS service object
const sqs = new AWS.SQS(
  {
    region: AWS_AWS_REGION,
    apiVersion: '2012-11-05',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
);
// Get's a message off the the queue
const receiveMessage = async () => new Promise(async (resolve, reject) => {
  try {
    await sqs.receiveMessage(cfg.receive(), async (err, data) => {
      if (err) {
        throw (err);
      } else if (data.Messages) {
        await algolia.upsertToIndex(JSON.parse(data.Messages[0].Body));
        await sqs.deleteMessage(cfg.delete(data), (error) => {
          if (error) throw (error);
        });
      }
      resolve();
    });
  } catch (e) {
    reject(e);
  }
});

module.exports = receiveMessage;
