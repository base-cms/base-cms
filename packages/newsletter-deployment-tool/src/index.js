#!/usr/bin/env node

const yargs = require('yargs');
const commands = require('./commands');

const { log } = console;

commands(yargs);
yargs.demandCommand().help().parse();

process.on('unhandledRejection', (e) => {
  log('> Unhandled promise rejection. Throwing error...');
  throw e;
});
