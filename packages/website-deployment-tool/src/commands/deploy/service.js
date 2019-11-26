const deploy = require('@endeavorb2b/rancher2cli/src/commands/deploy/labels');
const { existsSync } = require('fs');
const { join } = require('path');
const { spawnSync } = require('child_process');
const https = require('https');
const { DOCKER_PASSWORD, DOCKER_USERNAME, TRAVIS_TAG } = require('./env');
const failed = require('../notify/failed');

const useLerna = existsSync(join(process.cwd(), 'lerna.json'));
// eslint-disable-next-line import/no-dynamic-require
const lerna = useLerna ? require(join(process.cwd(), 'lerna.json')) : { version: TRAVIS_TAG };
const { log } = console;

const version = `v${lerna.version}`;

const error = async (message) => {
  log(`ERROR: ${message}`);
  await failed();
  process.exit(1);
};

const getJson = (url, reqHeaders) => new Promise((resolve, reject) => {
  const headers = { ...reqHeaders, 'Content-Type': 'application/json; charset=utf-8' };
  https.get(url, { headers }, (resp) => {
    let data = '';
    const { statusCode, statusMessage } = resp;
    if (statusCode >= 500) return reject(statusMessage);
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => resolve(JSON.parse(data)));
    return null;
  }).on('error', reject);
});

const getVersions = async (image) => {
  const authUrl = `https://auth.docker.io/token?service=registry.docker.io&scope=repository:${image}:pull`;
  const { token } = await getJson(authUrl);
  const url = `https://registry.hub.docker.com/v2/${image}/tags/list`;
  const list = await getJson(url, { Authorization: `Bearer ${token}` });
  return Array.isArray(list.tags) ? list.tags : [];
};

const shouldBuild = async (image) => {
  log(`\nChecking  ${image}:${version} on DockerHub`);
  const versions = await getVersions(image);
  return !versions.includes(version);
};

module.exports = async (argv) => {
  const { service, namespace } = argv;
  const servicePath = join(process.cwd(), 'services', service, 'package.json');

  if (TRAVIS_TAG !== version) error(`Tagged version ${TRAVIS_TAG} differs from expected version ${version}, aborting!`);
  if (!service) error('You must specify the service folder to deploy.');
  if (!existsSync(servicePath)) error(`Could not read ${servicePath}!`);

  // eslint-disable-next-line import/no-dynamic-require, global-require
  const pkg = require(servicePath);
  const name = pkg.name.replace('@', '').replace('/', '-');
  const image = `basecmswebsites/${name}-service`;

  if (version !== `v${pkg.version}`) {
    log(`Service ${name} is at version ${pkg.version}. Skipping deployment.`);
    process.exit(0);
  }

  const docker = async (args = []) => {
    const { status } = await spawnSync('docker', args, { stdio: 'inherit' });
    if (status !== 0) error('Image build failed!');
  };

  const build = async () => {
    const imageTag = `${service}:${version}`;
    log(`Building  ${image}:${version}...\n`);
    await docker(['login', '-u', DOCKER_USERNAME, '-p', DOCKER_PASSWORD]);
    await docker(['build', '-t', imageTag, '--build-arg', `SERVICE=${service}`, process.cwd()]);
    await docker(['tag', imageTag, `${image}:${version}`]);
    await docker(['push', `${image}:${version}`]);
    await docker(['image', 'rm', imageTag]);
  };

  try {
    if (await shouldBuild(image)) {
      log('Image was not found, building.');
      await build();
      log('Build complete.');
    } else {
      log('Image found, skipping build.');
    }

    const { RANCHER_CLUSTERID, RANCHER_TOKEN, RANCHER_URL } = process.env;
    if (!RANCHER_CLUSTERID) return error('Deployment aborted: Environment variable RANCHER_CLUSTERID is missing!');
    if (!RANCHER_TOKEN) return error('Deployment aborted: Environment variable RANCHER_TOKEN is missing!');
    if (!RANCHER_URL) return error('Deployment aborted: Environment variable RANCHER_URL is missing!');

    await deploy({
      key: 'basecms-website-service',
      value: name,
      image: `${image}:${version}`,
      namespace,
    });
    log('Deploy complete.\n');
  } catch (e) {
    error(e);
  }
  return true;
};
