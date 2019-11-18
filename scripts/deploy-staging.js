#!/usr/bin/env node
/**
 * Deployment tool for service containers
 * Requirements:
 * - Argument 1: the service name to deploy [graphql,...]
 * - ENV
 *   - DOCKERHUB_USERNAME
 *   - DOCKERHUB_PASSWORD
 *   - TRAVIS_COMMIT
 *   - RANCHER_URL
 *   - RANCHER_TOKEN
 *   - RANCHER_CLUSTERID
 *   - SLACK_WEBHOOK_URL
 */

const { existsSync } = require('fs');
const { join } = require('path');
const { spawnSync } = require('child_process');
const https = require('https');

const { log } = console;
const { RANCHER_CLUSTERID } = process.env;

const environment = RANCHER_CLUSTERID === 'c-rc5kp' ? 'staging' : 'production';
const { stdout } = spawnSync('git', ['describe', '--tags']);
const version = `${stdout}`.trim();
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

const error = (message) => {
  log(`ERROR: ${message}`);
  const text = `Deployment of \`${image}\` @ \`${version}\` to \`${environment}\` FAILED!\n${message}`;
  const payload = JSON.stringify({ attachments: [{ color: 'danger', text }] });
  const { SLACK_WEBHOOK_URL } = process.env;
  const req = https.request(SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': payload.length,
    },
  }, (res) => {
    res.on('data', () => {
      log('Slack notified.');
      process.exit(1);
    });
  });

  req.on('error', (e) => {
    log(e);
    process.exit(1);
  });
  req.write(payload);
  req.end();
};

if (!service) error('You must specify the service folder to deploy.');
if (!existsSync(servicePath)) error(`Could not read ${servicePath}!`);

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
  if (environment === 'production') throw new Error('This file cannot be used to deploy to the production environment!');
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
