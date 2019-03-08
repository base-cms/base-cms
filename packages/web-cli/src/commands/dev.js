const log = require('fancy-log');
const { blue, gray } = require('chalk');
const { existsSync } = require('fs');
const { resolve, parse } = require('path');
const exit = require('../utils/print-and-exit');
const serve = require('../gulp/serve');

module.exports = ({ _ }) => {
  const [, file] = _;
  const server = resolve(process.cwd(), file);

  if (!existsSync(server)) {
    exit(`No such server file exists at ${server}`);
  }
  const cwd = parse(server).dir;

  log(`Running '${blue('dev')}' command using server file '${gray(server)}'`);
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  serve(cwd, server)();
};
