#!/usr/bin/env node
process.on('unhandledRejection', (e) => { throw e; });

const owner = process.argv[2];
if (!owner) throw new Error('The repository owner argument must be provided.');
const repo = process.argv[3];
if (!repo) throw new Error('The repository name argument must be provided.');
const base = process.argv[4];
if (!base) throw new Error('The base commit argument must be provided.');
const head = process.argv[5];
if (!head) throw new Error('The head commit argument must be provided.');

require('../src/between')({
  owner,
  repo,
  base,
  head,
}).catch(e => setImmediate(() => { throw e; }));
