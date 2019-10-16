const fetch = require('node-fetch');
const createError = require('http-errors');
const { cleanPath } = require('@base-cms/utils');
const { dasherize } = require('@base-cms/inflector');
const { getAsObject } = require('@base-cms/object-path');
const pkg = require('../package.json');

const { isArray } = Array;

class Base4RestApiClient {
  constructor({
    uri,
    username,
    password,
    baseEndpoint = '/api/2.0rcpi',
    options,
  } = {}) {
    if (!uri || !username || !password) throw new Error('A uri, username, and password are required for the Base REST API.');
    this.uri = uri.replace(/\/+$/, '');
    this.username = username;
    this.password = password;
    this.baseEndpoint = baseEndpoint;
    this.options = {
      ...options,
      includeMeta: 0,
      queryInversed: 1,
      referenceFormat: 'object',
      sideloadData: 0,
    };
  }

  async findOne({ model, id, options } = {}) {
    if (!id) throw new Error('A Base4 model `id` value is required to findOne.');
    if (!model) throw new Error('A Base4 API model type is required to findOne.');
    return this.get({
      endpoint: `/${cleanPath(model)}/${id}`,
      options,
    });
  }

  async insertOne({ model, body, options } = {}) {
    if (!model) throw new Error('A Base4 API model type is required to insertOne.');
    return this.post({
      endpoint: `/${cleanPath(model)}`,
      body,
      options,
    });
  }

  async insertMany({ model, bodies, options } = {}) {
    if (!isArray(bodies)) throw new Error('An array of request bodies is required to insertMany.');
    return Promise.all(bodies.map(body => this.insertOne({ model, body, options })));
  }

  async updateOne({
    model,
    id,
    body,
    options,
  } = {}) {
    if (!id) throw new Error('A Base4 model `id` value is required to updateOne.');
    if (!model) throw new Error('A Base4 API model type is required to updateOne.');
    return this.patch({
      endpoint: `/${cleanPath(model)}/${id}`,
      body,
      options,
    });
  }

  async removeOne({ model, id, options } = {}) {
    if (!id) throw new Error('A Base4 model `id` value is required to removeOne.');
    if (!model) throw new Error('A Base4 API model type is required to removeOne.');
    return this.delete({
      endpoint: `/${cleanPath(model)}/${id}`,
      options,
    });
  }

  async post({ endpoint, body, options } = {}) {
    if (!endpoint) throw new Error('A Base4 API endpoint is required to execute a post request.');
    if (!body) throw new Error('A Base4 API request body is required to execute a post request.');
    return this.fetch({
      method: 'post',
      body,
      type: 'persistence',
      endpoint,
      options,
    });
  }

  async patch({ endpoint, body, options } = {}) {
    if (!endpoint) throw new Error('A Base4 API endpoint is required to execute a patch request.');
    if (!body) throw new Error('A Base4 API request body is required to execute a patch request.');
    return this.fetch({
      method: 'patch',
      body,
      type: 'persistence',
      endpoint,
      options,
    });
  }

  async get({ endpoint, options } = {}) {
    if (!endpoint) throw new Error('A Base4 API endpoint is required to execute a get request.');
    return this.fetch({
      method: 'get',
      type: 'persistence',
      endpoint,
      options,
    });
  }

  async delete({ endpoint, options } = {}) {
    if (!endpoint) throw new Error('A Base4 API endpoint is required to execute a delete request.');
    return this.fetch({
      method: 'delete',
      type: 'persistence',
      endpoint,
      options,
    });
  }

  async fetch({
    method,
    type,
    endpoint,
    body,
    options = {},
  } = {}) {
    const url = this.buildUrl({ type, endpoint });
    const headers = {
      ...getAsObject(options.headers),
      ...this.buildOptionHeaders(),
      'content-type': 'application/json',
      'user-agent': `${pkg.name}/${pkg.version} (+https://github.com/base-cms/base-cms)`,
      authorization: `Basic ${this.encodeAuth()}`,
    };
    const opts = {
      ...options,
      method,
      ...(body && { body: JSON.stringify(body) }),
      headers,
    };

    const res = await fetch(url, opts);
    if (res.status === 204) {
      // No content.
      return 'ok';
    }
    const json = await res.json();
    if (res.ok) return json;
    if (json && json.error) {
      const { error } = json;
      throw createError(res.status, `Base4 REST API error: ${error.message}`);
    }
    if (json && json.errors) {
      const { errors } = json;
      throw createError(res.status, `Base4 REST API error: ${errors.detail} Code: ${errors.code}`);
    }
    throw createError(res.status, `Base4 REST API error: ${res.statusText}`);
  }

  buildUrl({ type, endpoint } = {}) {
    if (!['persistence', 'search'].includes(type)) throw new Error(`The API resource type '${type}' is not supported.`);
    if (!endpoint) throw new Error('An API endpoint is required.');
    return `${this.uri}/${cleanPath(this.baseEndpoint)}/${type}/${cleanPath(endpoint)}`;
  }

  buildOptionHeaders() {
    return Object.keys(this.options).reduce((o, key) => {
      const value = this.options[key];
      return { ...o, [`x-modlr-api-${dasherize(key)}`]: value };
    }, {});
  }

  encodeAuth() {
    return Buffer.from(`${this.username}:${this.password}`).toString('base64');
  }
}

module.exports = Base4RestApiClient;
