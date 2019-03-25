const del = require('del');

module.exports = cwd => () => del('dist/**/*', { cwd });
