#!/usr/bin/env node

const yargs = require('yargs');
const log = require('fancy-log');
const commands = require('./commands');

log('Dependency tool starting...');
process.on('unhandledRejection', (e) => { throw e; });

commands(yargs);
yargs.demandCommand().help().parse();
