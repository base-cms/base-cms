const { ALGOLIA_SQS_URI } = require('../../env');

module.exports = {
  receive: () => ({
    AttributeNames: ['SentTimestamp'],
    MaxNumberOfMessages: 1,
    MessageAttributeNames: ['All'],
    QueueUrl: ALGOLIA_SQS_URI,
    WaitTimeSeconds: 20,
  }),
  delete: data => ({
    QueueUrl: ALGOLIA_SQS_URI,
    ReceiptHandle: data.Messages[0].ReceiptHandle,
  }),
};
