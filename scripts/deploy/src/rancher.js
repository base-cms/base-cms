const fetch = require('node-fetch');
const objectPath = require('object-path');
const retry = require('retry');

class Rancher {
  constructor({
    uri,
    accessKey,
    secretKey,
    timeoutMs = 60000,
    sleepMs = 1000,
  }) {
    if (!uri || !accessKey || !secretKey) throw new Error('Rancher is missing a required argument.');
    this.uri = uri;
    this.accessKey = accessKey;
    this.secretKey = secretKey;
    this.timeoutMs = timeoutMs;
    this.sleepMs = sleepMs;
  }

  static checkStatus(res) {
    if (res.ok) return res.json();
    throw new Error(res.statusText);
  }

  getHeaders() {
    const hashed = Buffer.from(`${this.accessKey}:${this.secretKey}`).toString('base64');
    return {
      'Content-Type': 'application/json',
      Authorization: `Basic ${hashed}`,
    };
  }

  async findServicesByTag({ service }) {
    const url = `${this.uri}/services?system=false&limit=1000`;
    const headers = this.getHeaders();
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(res.statusText);
    const { data } = await res.json();
    return data.filter(item => service === objectPath.get(item, 'launchConfig.labels.service'));
  }

  async upgradeService({
    service,
    image,
    finish = false,
    startFirst = true,
  }) {
    const url = `${this.uri}/services/${service.id}?action=upgrade`;
    const headers = this.getHeaders();
    const { launchConfig } = service;
    launchConfig.imageUuid = `docker:${image}`;
    const body = JSON.stringify({
      inServiceStrategy: {
        batchSize: 1,
        intervalMillis: 2000,
        startFirst,
        launchConfig,
      },
    });

    const res = await fetch(url, { method: 'POST', headers, body });
    if (!res.ok) throw new Error(res.statusText);
    const json = await res.json();

    if (!finish) return json;
    return this.finishUpgrade({ service });
  }

  waitForServiceStatus({ service, status }) {
    const op = retry.operation({
      minTimeout: this.sleepMs,
      maxTimeout: this.timeoutMs,
    });

    const url = `${this.uri}/services/${service.id}`;
    const headers = this.getHeaders();

    const action = async () => {
      const res = await fetch(url, { headers });
      if (!res.ok) throw new Error(res.statusText);
      const json = await res.json();
      if (json.state.toUpperCase() !== status.toUpperCase()) {
        throw new Error(`Service state ${json.state} does not match ${status}.`);
      }
    };

    return new Promise((resolve, reject) => {
      op.attempt(() => action().then(resolve).catch((e) => {
        if (!op.retry(e)) reject(e);
      }));
    });
  }

  async finishUpgrade({ service }) {
    await this.waitForServiceStatus({ service, status: 'UPGRADED' });
    const url = `${this.uri}/services/${service.id}?action=finishupgrade`;
    const headers = this.getHeaders();
    const res = await fetch(url, { method: 'POST', headers });
    if (!res.ok) throw new Error(res.statusText);
    return this.waitForServiceStatus({ service, status: 'ACTIVE' });
  }
}

module.exports = Rancher;
