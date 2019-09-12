#!/usr/bin/env node
const program = require('yargs');
const path = require('path');
const compile = require('../src/compile');

const { log } = console;

program
  .usage('Usage: $0 <command> [options]')
  .command({
    command: 'compile [options]',
    desc: 'Compile Marko templates in a given directory',
    builder: yargs => yargs
      .option('dir', {
        alias: 'd',
        describe: 'Load templates from a directory',
        type: 'string',
      })
      .option('silent', {
        alias: 's',
        describe: 'Silently compile templates',
        type: 'boolean',
        default: false,
      })
      .demandOption(['dir']),
    handler: async ({ dir, silent }) => {
      const resolvedDir = path.resolve(dir);
      log(`Compiling Marko templates in ${resolvedDir}...`);
      try {
        await compile({ dir: resolvedDir, silent });
        log('Templates compiled successfully.');
      } catch (e) {
        log(e);
        process.exit(1);
      }
    },
  }).demandCommand(1, 'You need at least one command before moving on')
  .help();

const run = () => program.argv;
run();
