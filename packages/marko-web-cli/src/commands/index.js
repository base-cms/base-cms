const build = require('./build');
const newProject = require('./new');
const serve = require('./serve');
const lint = require('./lint');

module.exports = (program) => {
  build(program);
  serve(program);
  newProject(program);
  lint(program);
};
