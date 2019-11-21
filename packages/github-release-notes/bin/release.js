#!/usr/bin/env node
process.on('unhandledRejection', (e) => { throw e; });

const owner = process.argv[2];
if (!owner) throw new Error('The repository owner argument must be provided.');
const repo = process.argv[3];
if (!repo) throw new Error('The repository name argument must be provided.');

require('../src')({ owner, repo }).catch(e => setImmediate(() => { throw e; }));
