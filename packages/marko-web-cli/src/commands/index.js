const build = require('./build');
const newProject = require('./new');
const serve = require('./serve');

module.exports = (program) => {
  build(program);
  serve(program);
  newProject(program);
};
