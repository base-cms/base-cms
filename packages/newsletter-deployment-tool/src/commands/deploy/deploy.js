
const { existsSync } = require('fs');
const { join } = require('path');
const { spawnSync } = require('child_process');
const https = require('https');
const {
  DOCKER_PASSWORD,
  DOCKER_USERNAME,
  TRAVIS_TAG,
} = require('./env');
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
  const { tenant, namespace } = argv;
  const tenantPath = join(process.cwd(), 'tenants', tenant, 'package.json');

  if (TRAVIS_TAG !== version) error(`Tagged version ${TRAVIS_TAG} differs from expected version ${version}, aborting!`);
  if (!tenant) error('You must specify the tenant folder to deploy.');
  if (!existsSync(tenantPath)) error(`Could not read ${tenantPath}!`);

  // eslint-disable-next-line import/no-dynamic-require, global-require
  const pkg = require(tenantPath);
  const name = pkg.name.replace('@', '').replace('/', '-');
  const image = `basecmsnewsletters/${name}`;

  if (version !== `v${pkg.version}`) {
    log(`Newsletter tenant ${name} is at version ${pkg.version}. Skipping deployment.`);
    process.exit(0);
  }

  const docker = async (args = []) => {
    const { status } = await spawnSync('docker', args, { stdio: 'inherit' });
    if (status !== 0) error('Image build failed!');
  };

  const build = async () => {
    const imageTag = `${tenant}:${version}`;
    log(`Building  ${image}:${version}...\n`);
    await docker(['login', '-u', DOCKER_USERNAME, '-p', DOCKER_PASSWORD]);
    await docker(['build', '-t', imageTag, '--build-arg', `SITE=${tenant}`, process.cwd()]);
    await docker(['tag', imageTag, image]);
    await docker(['push', image]);
    await docker(['image', 'rm', imageTag]);
  };

  const deploy = async () => {
    log(`Deploying ${image}:${version} on Kubernertes`);
    const { status } = await spawnSync('bash', ['deploy/k8s.sh', tenant, version, namespace], { stdio: 'inherit' });
    if (status !== 0) error('Image deploy failed!');
  };

  try {
    if (await shouldBuild(image)) {
      log('Image was not found, building.');
      await build();
      log('Build complete.');
    } else {
      log('Image found, skipping build.');
    }
    // await deploy();
    log('Deploy complete.\n');
  } catch (e) {
    error(e);
  }
};
