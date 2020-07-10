const minimist = require('minimist');
const receiveMessage = require('./components/aws-sqs/sqs');
const siteSync = require('./components/algolia/site-sync');

const { log } = console;

const args = minimist(process.argv.slice(2), {
  default: {
    limit: 500,
    skip: 0,
  },
});

const run = () => {
  if (args.tenant) {
    siteSync.setup(args.tenant, args.limit, args.skip);
  } else {
    log('Waiting for message...');
    receiveMessage();
  }
};

run();
