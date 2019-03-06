const build = require('./build');
const newProject = require('./new');
const dev = require('./dev');
const lint = require('./lint');

module.exports = (program) => {
  build(program);
  dev(program);
  newProject(program);
  lint(program);
};
