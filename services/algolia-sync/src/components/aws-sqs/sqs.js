require('aws-sdk/clients/sqs');
const AWS = require('aws-sdk/global');
const algolia = require('../algolia/message-sync');
const cfg = require('./config');
require('dotenv').config();

AWS.config.update({ region: 'us-east-1' });
// Create the SQS service object
const sqs = new AWS.SQS(
  {
    apiVersion: '2012-11-05',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
);
// Get's a message off the the queue
const receiveMessage = () => {
  sqs.receiveMessage(cfg.receive(), async (err, data) => {
    if (err) {
      throw (err);
    } else if (data.Messages) {
      await algolia.upsertToIndex(JSON.parse(data.Messages[0].Body));
      await sqs.deleteMessage(cfg.delete(data), (error) => {
        if (error) throw (error);
      });
    }
    receiveMessage();
  });
};

module.exports = receiveMessage;
