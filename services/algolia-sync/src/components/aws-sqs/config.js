require('dotenv').config();

module.exports = {
  receive: () => ({
    AttributeNames: ['SentTimestamp'],
    MaxNumberOfMessages: 1,
    MessageAttributeNames: ['All'],
    QueueUrl: process.env.SQS_URI,
    WaitTimeSeconds: 20,
  }),
  delete: data => ({
    QueueUrl: process.env.SQS_URI,
    ReceiptHandle: data.Messages[0].ReceiptHandle,
  }),
};
