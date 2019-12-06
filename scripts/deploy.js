#!/usr/bin/env node
/**
 * Deployment tool for service containers
 * Requirements:
 * - Argument 1: the service name to deploy [graphql,...]
 * - ENV
 *   - DOCKERHUB_USERNAME
 *   - DOCKERHUB_PASSWORD
 *   - RANCHER_URL
 *   - RANCHER_TOKEN
 *   - RANCHER_CLUSTERID
 *   - SLACK_WEBHOOK_URL
 */

const { existsSync } = require('fs');
const { join } = require('path');
const { spawnSync } = require('child_process');
const https = require('https');
const lerna = require('../lerna.json');

const { log } = console;
const { TRAVIS_TAG, TARGET } = process.env;
const isProd = TARGET === 'production';

const getVersion = () => {
  if (isProd) return `v${lerna.version}`;
  const { stdout } = spawnSync('git', ['describe', '--tags']);
  return `v${stdout}`.trim();
};
const version = getVersion();
const service = process.argv[2];
const servicePath = join('services', service);
const image = `basecms/${service}`;

const nrIds = {
  'graphql-server': 222815958,
  rss: 222849027,
  sitemaps: 222844922,
  hooks: 231283772,
  oembed: 260472160,
  'google-data-api': 305296335,
};

const error = async (message) => {
  log(`ERROR: ${message}`);
  await spawnSync('npx', ['@base-cms/website-deployment-tool', 'notify-failed', message], { stdio: 'inherit' });
  process.exit(1);
};

if (isProd && TRAVIS_TAG !== version) error(`Tagged version ${TRAVIS_TAG} differs from lerna version ${version}, aborting!`);
if (!service) error('You must specify the service folder to deploy.');
if (!existsSync(servicePath)) error(`Could not read ${servicePath}!`);

const pkg = require(`../${servicePath}/package.json`); // eslint-disable-line import/no-dynamic-require

if (isProd && version !== `v${pkg.version}`) {
  log(`Service ${service} is at version ${pkg.version}. Skipping deployment.`);
  process.exit(0);
}

const getJson = (url, reqHeaders) => new Promise((resolve, reject) => {
  const headers = { ...reqHeaders, 'Content-Type': 'application/json; charset=utf-8' };
  https.get(url, { headers }, (resp) => {
    let data = '';
    const { statusCode, statusMessage } = resp;
    if (statusCode >= 500) return reject(statusMessage);
    resp.on('data', chunk => data += chunk); // eslint-disable-line no-return-assign
    resp.on('end', () => resolve(JSON.parse(data)));
    return resp;
  }).on('error', reject);
});

const getVersions = async () => {
  const authUrl = `https://auth.docker.io/token?service=registry.docker.io&scope=repository:${image}:pull`;
  const { token } = await getJson(authUrl);
  const url = `https://registry.hub.docker.com/v2/${image}/tags/list`;
  const list = await getJson(url, { Authorization: `Bearer ${token}` });
  return Array.isArray(list.tags) ? list.tags : [];
};

const shouldBuild = async () => {
  log(`\nChecking  ${image}:${version} on DockerHub`);
  const versions = await getVersions();
  return !versions.includes(version);
};

/**
 * Build docker image and push to docker hub
 */
const build = async () => {
  log(`Building  ${image}:${version}...\n`);
  const { status } = await spawnSync('bash', ['scripts/deploy-image.sh', service, version], { stdio: 'inherit' });
  if (status !== 0) error('Image build failed!');
};

const deploy = async () => {
  log(`Deploying ${image}:${version} on Kubernertes`);
  const nrid = nrIds[service];
  const { status } = await spawnSync('bash', ['scripts/deploy-k8s.sh', service, version, nrid], { stdio: 'inherit' });
  if (status !== 0) error('Image deploy failed!');
};

const main = async () => {
  if (await shouldBuild()) {
    log('  Image was not found, building.');
    await build();
    log('    Build complete.');
  } else {
    log('  Image found, skipping build.');
  }
  await deploy();
  log('  Deploy complete.\n');
};

main().catch(error);
