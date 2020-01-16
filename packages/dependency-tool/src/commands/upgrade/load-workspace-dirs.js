const path = require('path');
const { readdirSync, existsSync } = require('fs');

module.exports = (dir, workspaces) => {
  const workspaceDirs = workspaces.map(ws => path.resolve(dir, ws.replace('/*', '/')));
  const packageDirs = [];
  workspaceDirs.forEach((workspaceDir) => {
    readdirSync(workspaceDir, { withFileTypes: true })
      .filter((dirent) => {
        if (!dirent.isDirectory()) return false;
        const loc = path.join(workspaceDir, dirent.name, 'package.json');
        return existsSync(loc);
      }).forEach(dirent => packageDirs.push(path.join(workspaceDir, dirent.name)));
  });
  return packageDirs;
};
