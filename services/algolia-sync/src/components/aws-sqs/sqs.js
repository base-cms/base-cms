require('aws-sdk/clients/sqs');
const AWS = require('aws-sdk/global');
const algolia = require('../algolia/message-sync');
const cfg = require('./config');
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } =require('../../env');

AWS.config.update({ region: 'us-east-1' });
// Create the SQS service object
const sqs = new AWS.SQS(
  {
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

// Check for messages loop
const checkForMessage = async () => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    await receiveMessage();
  }
};

module.exports = checkForMessage;
