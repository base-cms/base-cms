const validatePackage = require('validate-npm-package-name');
const chalk = require('chalk');

module.exports = ({ path, npmOrg }) => [
  {
    type: 'input',
    name: 'projectName',
    default: () => {
      if (npmOrg) return `@${npmOrg.replace('@', '')}/${path}`;
      return path;
    },
    message: chalk`Project Name {reset [will populate the {yellow name} field of the {yellow package.json} file]}:`,
    validate: (v) => {
      if (!v) return 'The project name is required.';
      const { validForNewPackages } = validatePackage(v);
      if (!validForNewPackages) return 'The project name is not a valid package.json name.';
      return true;
    },
    filter: v => (v ? String(v).trim() : v),
  },
  {
    type: 'input',
    name: 'siteName',
    message: chalk`Site Name {reset [will be used in {yellow <title>} and {yellow <meta>} elements]}:`,
    validate: v => (v ? true : 'The site name is required.'),
    filter: v => (v ? String(v).trim() : v),
  },
];
