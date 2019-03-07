const validatePackage = require('validate-npm-package-name');
const chalk = require('chalk');
const { isURL } = require('validator');

module.exports = ({ path, npmOrg }) => [
  {
    type: 'input',
    name: 'projectName',
    default: () => {
      if (npmOrg) return `@${npmOrg.replace('@', '')}/${path}`;
      return path;
    },
    message: chalk`Project Name {reset [used as the {yellow name} field of the {yellow package.json} file]}:`,
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
    message: chalk`Site Name {reset [used in {yellow <title>} and {yellow <meta>} elements]}:`,
    validate: v => (v ? true : 'The site name is required.'),
    filter: v => (v ? String(v).trim() : v),
  },
  {
    type: 'input',
    name: 'siteLogo',
    message: chalk`Site Logo {reset [enter absolute URL or leave blank for none]}:`,
    validate: (v) => {
      if (!v) return true;
      return isURL(v, {
        protocols: ['http', 'https'],
        require_protocol: true,
      }) ? true : 'Invalid URL.';
    },
    filter: v => (v ? String(v).trim() : v),
  },
  {
    type: 'input',
    name: 'graphqlUri',
    message: chalk`GraphQL URL {reset [used to retrieve your BaseCMS website data]}:`,
    validate: (v) => {
      if (!v) return 'The GraphQL URL is required.';
      return isURL(v, {
        protocols: ['http', 'https'],
        require_protocol: true,
      }) ? true : 'Invalid URL.';
    },
    filter: v => (v ? String(v).trim() : v),
  },
  {
    type: 'input',
    name: 'locale',
    default: 'en_US',
    message: chalk`Locale {reset [the ICU locale ID]}:`,
  },
  {
    type: 'confirm',
    name: 'withBootstrap',
    message: 'Install Bootstrap design components?',
    default: false,
  },
  {
    type: 'confirm',
    name: 'proceed',
    message: chalk`{magenta Confirm} your choices and {green proceed} with install?`,
    default: false,
  },
];
