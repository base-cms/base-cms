const yargs = require('yargs');
const checkForMessage = require('./components/aws-sqs/sqs');
const siteSync = require('./components/algolia/site-sync');

const { log } = console;

yargs.command({
  command: 'sync',
  describe: 'Sync all content',
  builder: {
    tenant: {
      describe: 'Account_Group',
      demandOption: true,
      type: 'string',
    },
    limit: {
      describe: 'Limits the number to proccess',
      demandOption: false,
      type: 'number',
      default: 500,
    },
    skip: {
      describe: 'Number of content to skip',
      demandOption: false,
      type: 'number',
      default: 0,
    },
  },

  handler(argv) {
    siteSync.setup(argv.tenant, argv.limit, argv.skip);
  },
});

yargs.command({
  command: 'watch',
  describe: 'Watch for messages in SQS',

  handler() {
    log('Waiting for message...');
    checkForMessage();
  },
});

yargs.parse();
