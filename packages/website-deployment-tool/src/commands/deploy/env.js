const { cleanEnv, makeValidator, url } = require('envalid');

const nonemptystr = makeValidator((v) => {
  const err = new Error('Expected a non-empty string');
  if (v === undefined || v === null || v === '') {
    throw err;
  }
  const trimmed = String(v).trim();
  if (!trimmed) throw err;
  return trimmed;
});

module.exports = cleanEnv(process.env, {
  DOCKER_PASSWORD: nonemptystr({ desc: 'The DockerHub credentials.' }),
  DOCKER_USERNAME: nonemptystr({ desc: 'The DockerHub credentials.' }),
  ENVIRONMENT: nonemptystr({ desc: 'The environment to deploy to.', choices: ['production', 'staging'] }),
  RANCHER_CLUSTERID: nonemptystr({ desc: 'The Rancher cluster to deploy to.' }),
  RANCHER_TOKEN: nonemptystr({ desc: 'The Rancher credentials.' }),
  RANCHER_URL: url({ desc: 'The Rancher URL to deploy to.' }),
  TRAVIS_TAG: nonemptystr({ desc: 'The version to deploy.' }),
});
