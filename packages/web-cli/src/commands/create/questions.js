const validatePackage = require('validate-npm-package-name');
const chalk = require('chalk');
const { isURL } = require('validator');
const { existsSync } = require('fs');
const { createClient } = require('@base-cms/express-apollo');
const gql = require('graphql-tag');
const querySections = require('./query-root-sections');

module.exports = ({
  path,
  npmOrg,
  siteName,
  templateDir,
  graphqlUri,
}) => [
  {
    type: 'input',
    name: 'projectName',
    default: () => {
      if (npmOrg) return `@${npmOrg.replace('@', '')}/${path.replace('/', '-').replace('\\', '-')}`;
      return path;
    },
    message: chalk`Project Name {reset [used as the {blue name} field of the {blue package.json} file]}:`,
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
    default: siteName,
    message: chalk`Site Name {reset [used in {blue <title>} and {blue <meta>} elements]}:`,
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
    name: 'locale',
    default: 'en_US',
    message: chalk`Locale {reset [the ICU locale ID]}:`,
    validate: v => (v ? true : 'The locale is required.'),
    filter: v => (v ? String(v).trim() : v),
  },
  {
    type: 'input',
    name: 'graphqlUri',
    default: graphqlUri,
    message: chalk`GraphQL URL {reset [used to retrieve your BaseCMS website data]}:`,
    validate: async (v, answers) => {
      if (!v) return 'The GraphQL URL is required.';
      if (!isURL(v, { protocols: ['http', 'https'], require_protocol: true })) {
        return 'Invalid URL.';
      }
      const client = createClient(v);
      try {
        await client.query({ query: gql`{ ping }` });
        // eslint-disable-next-line no-param-reassign
        answers.graphql = { pinged: true, client };
        // eslint-disable-next-line no-param-reassign
        answers.proceed = true;
        return true;
      } catch (e) {
        // eslint-disable-next-line no-param-reassign
        answers.graphql = { pinged: false };
        return true;
      }
    },
    filter: v => (v ? String(v).trim() : v),
  },
  {
    type: 'confirm',
    name: 'proceed',
    default: false,
    message: chalk`{red Unable} to ping the provided GraphQL URL. Proceed anyway?`,
    when: ({ graphql }) => graphql.pinged === false,
  },
  {
    type: 'confirm',
    name: 'withNavItems',
    message: 'Add example website section navigation?',
    default: true,
    when: ({ proceed, graphql }) => proceed === true && graphql.pinged === true,
  },
  {
    type: 'checkbox',
    name: 'sections',
    message: 'Select navigation items...',
    choices: (answers) => {
      const { client } = answers.graphql;
      return querySections(client);
    },
    when: ({ withNavItems }) => withNavItems === true,
  },
  {
    type: 'confirm',
    name: 'withBootstrap',
    message: 'Install Bootstrap design components?',
    default: true,
    when: ({ proceed }) => proceed === true,
  },
  {
    type: 'input',
    name: 'templateDir',
    default: templateDir,
    message: chalk`Custom template directory {reset [enter relative path or leave blank for none]}:`,
    validate: (v) => {
      if (!v) return true;
      return existsSync(v) ? true : `Path ${v} does not exist!`;
    },
    filter: v => (v ? String(v).trim() : v),
  },
  {
    type: 'confirm',
    name: 'proceed',
    message: chalk`{magenta Confirm} your choices and {green proceed} with install?`,
    default: false,
    when: ({ proceed }) => proceed === true,
  },
];
