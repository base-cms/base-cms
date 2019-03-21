const { ObjectID } = require('mongodb');
const objectPath = require('object-path');
const { isObject } = require('@base-cms/common');
const { Client } = require('./mongodb');
const paginateFind = require('./paginate/find');
const { createEmptyResponse: paginateEmpty } = require('./paginate/utils');

const { isArray } = Array;
const { hrtime } = process;

/**
 * The Base collection namespaces.
 *
 * These are used to calculcate the MongoDB
 * database names.
 *
 * @type {string[]}
 */
const namespaces = [
  'email',
  'magazine',
  'platform',
  'website',
];

class BaseDB {
  /**
   * @param {object} params The Base DB params
   * @param {string} baseOpts.tenant The Base tenant key, e.g. `cygnus_ofcr`.
   * @param {string} baseOpts.client The MongoClient instance to use.
   */
  constructor({ tenant, client, logger } = {}) {
    if (!tenant) {
      throw new Error('No tenant was provided.');
    }
    this.tenant = tenant;
    if (!(client instanceof Client)) {
      throw new Error('BaseDB.client must be an instanceof Client.');
    }
    this.client = client;
    this.logger = logger;
  }

  /**
   * Finds a single document for the provided model name and ID.
   *
   * @param {string} modelName The model name, e.g. `platform.Content`.
   * @param {string|number|ObjectID} id The model identifier.
   * @param {object} [options] Options to pass to `Collection.findOne`.
   * @return {Promise<object|null>}
   */
  async findById(modelName, id, options) {
    if (!id) return null;
    return this.findOne(modelName, { _id: BaseDB.coerceID(id) }, options);
  }

  /**
   * Finds a single document for the provided model name and ID.
   * Will throw an error if the document is not found.
   *
   * @param {string} modelName The model name, e.g. `platform.Content`.
   * @param {string|number|ObjectID} id The model identifier.
   * @param {object} [options] Options to pass to `Collection.findOne`.
   * @return {Promise<object|null>}
   */
  async strictFindById(modelName, id, options) {
    const doc = await this.findById(modelName, id, options);
    if (!doc) throw BaseDB.error(`No ${modelName} record found for ID ${id}`, 404);
    return doc;
  }

  /**
   * Finds a single document for the provided model name and (optional) query criteria.
   *
   * @param {string} modelName The model name, e.g. `platform.Content`.
   * @param {object} [query] The query criteria.
   * @param {object} [options] Options to pass to `Collection.findOne`.
   * @return {Promise<object|null>}
   */
  async findOne(modelName, query, options) {
    const start = hrtime();
    const { namespace, resource } = BaseDB.parseModelName(modelName);
    const coll = await this.collection(namespace, resource);
    const doc = await coll.findOne(query, options);
    this.log('findOne', start, { modelName, query, options });
    return doc;
  }

  /**
   * Finds a single document for the provided model name and (optional) query criteria.
   * Will throw an error if the document is not found.
   *
   * @param {string} modelName The model name, e.g. `platform.Content`.
   * @param {object} [query] The query criteria.
   * @param {object} [options] Options to pass to `Collection.findOne`.
   * @return {Promise<object|null>}
   */
  async strictFindOne(modelName, query, options) {
    const doc = await this.findOne(modelName, query, options);
    if (!doc) throw BaseDB.error(`No ${modelName} record found for ID ${JSON.stringify(query)}`, 404);
    return doc;
  }

  /**
   * Finds a multiple documents for the provided model name and (optional) query criteria.
   * Will return an array of documents.
   *
   * @param {string} modelName The model name, e.g. `platform.Content`.
   * @param {object} [query] The query criteria.
   * @param {object} [options] Options to pass to `Collection.find`.
   * @return {Promise<object[]>}
   */
  async find(modelName, query, options) {
    const start = hrtime();
    const { namespace, resource } = BaseDB.parseModelName(modelName);
    const coll = await this.collection(namespace, resource);
    const docs = await coll.find(query, options).toArray();
    this.log('find', start, { modelName, query, options });
    return docs;
  }

  /**
   * Counts the number of documents for the provided model name and (optional) query criteria.
   *
   * @param {string} modelName The model name, e.g. `platform.Content`.
   * @param {object} [query] The query criteria.
   * @param {object} [options] Options to pass to `Collection.countDocuments`.
   */
  async count(modelName, query, options) {
    const start = hrtime();
    const { namespace, resource } = BaseDB.parseModelName(modelName);
    const coll = await this.collection(namespace, resource);
    const count = await coll.countDocuments(query, options);
    this.log('countDocuments', start, { modelName, query, options });
    return count;
  }

  /**
   * Returns distinct values for the provided model name, key (field name)
   * and (optional) query criteria.
   *
   * @param {string} modelName The model name, e.g. `platform.Content`.
   * @param {string} key The field name to return distinct values from.
   * @param {object} [query] The query criteria.
   * @param {object} [options] Options to pass to `Collection.distinct`.
   */
  async distinct(modelName, key, query, options) {
    const start = hrtime();
    const { namespace, resource } = BaseDB.parseModelName(modelName);
    const coll = await this.collection(namespace, resource);
    const values = await coll.distinct(key, query, options);
    this.log('distinct', start, {
      modelName,
      key,
      query,
      options,
    });
    return values;
  }

  /**
   *
   * @param {string} modelName The model name, e.g. `platform.Content`.
   * @param {object} params
   * @param {object} [params.query]
   */
  async paginate(modelName, {
    query,
    limit,
    skip,
    after,
    sort,
    collate,
    projection,
    excludeProjection,
    ignoreCompoundAfterSort,
  }) {
    return paginateFind(this, modelName, {
      query,
      limit,
      skip,
      after,
      sort,
      collate,
      projection,
      excludeProjection,
      ignoreCompoundAfterSort,
    });
  }

  /**
   * Returns a reference-one document for the provided document, model name and ref fields.
   *
   * For example, to retrieve the `createdBy` document referenced on a `Content` document,
   * run the following:
   *
   * ```
   * referenceOne({
   *  doc: content,
   *  relatedModel: 'platform.User',
   *  localField: 'createdBy',
   *  foreignField: '_id',
   * });
   * ```
   *
   * @param {object} params The function parameters.
   * @param {object} params.doc The document to pull the reference data from.
   * @param {string} params.relatedModel The reference's model name, e.g. `platform.Content`.
   * @param {string} params.localField The local document field path to retreive the ref value from.
   * @param {string} params.foreignField The foreign/reference document field to query against.
   * @param {object} [params.query] Additional query criteria to apply.
   * @param {object} [params.options] Options to pass to `Collection.findOne`.
   */
  async referenceOne({
    doc,
    relatedModel,
    localField,
    foreignField,
    query,
    options,
  } = {}) {
    const ref = BaseDB.get(doc, localField);
    const id = BaseDB.extractRefId(ref);
    if (!id) return null;
    return this.findOne(relatedModel, { ...query, [foreignField]: id }, options);
  }

  /**
   * Returns a cursor of reference-many documents for the
   * provided document, model name and ref fields.
   *
   * For example, to retrieve the `taxonomy` documents referenced on a `Content` document,
   * run the following:
   *
   * ```
   * referenceMany({
   *  doc: content,
   *  relatedModel: 'platform.Taxonomy',
   *  localField: 'taxonomy',
   *  foreignField: '_id',
   * });
   * ```
   *
   * @param {object} params The function parameters.
   * @param {object} params.doc The document to pull the reference data from.
   * @param {string} params.relatedModel The reference's model name, e.g. `platform.Content`.
   * @param {string} params.localField The local document field path to retreive the ref values.
   * @param {string} params.foreignField The foreign/reference document field to query against.
   * @param {object} [params.query] Additional query criteria to apply.
   * @param {object} [params.options] Options to pass to `Collection.find`.
   * @return {Promise<Cursor>}
   */
  async referenceMany({
    doc,
    relatedModel,
    localField,
    foreignField,
    query,
    options,
  } = {}) {
    const refs = BaseDB.get(doc, localField);
    const ids = BaseDB.extractRefIds(isArray(refs) ? refs : [refs]);
    return this.findAsArray(relatedModel, { ...query, [foreignField]: { $in: ids } }, options);
  }

  /**
   * Returns a MongoDB `Db` instance for the provided namespace.
   *
   * @param {string} namespace The model namespace, e.g. `platform` or `website`.
   * @param {object} [options] Options to pass to the `MongoClient.db` call.
   */
  db(namespace, options) {
    return this.client.db(this.dbNameFor(namespace), options);
  }

  /**
   * Returns a MongoDB `Collection` instance for the provided namespace and resource.
   *
   * @param {string} namespace The model namespace, e.g. `platform` or `website`.
   * @param {string} resource The resource/collection name, e.g. `Content` or `Section`.
   * @param {object} [options] Options to pass to the `Db.collection` call.
   */
  async collection(namespace, resource, options) {
    return this.client.collection(this.dbNameFor(namespace), resource, options);
  }

  /**
   * Creates the database name for the active tenant.
   *
   * @param {string} namespace The model namespace, e.g. `platform` or `website`.
   */
  dbNameFor(namespace) {
    if (!namespaces.includes(namespace)) {
      throw BaseDB.error(`The provided namespace '${namespace}' is invalid.`, 400);
    }
    return `${this.tenant}_${namespace}`;
  }

  /**
   * Explicitally connect to MongoDB.
   */
  connect() {
    return this.client.connect();
  }

  /**
   * Close the database connection.
   *
   * @param {boolean} [force]
   */
  close(force) {
    return this.client.close(force);
  }

  /**
   * @param {string} method
   * @param {array} hrtime
   * @param {object} data
   */
  log(method, start, data) {
    const { logger } = this;
    if (typeof logger === 'function') {
      const [secs, ns] = hrtime(start);
      logger({ method, data, time: `${(secs * 1000) + (ns / 1000000)}ms` });
    }
  }

  /**
   * Coerces a string ID to either a MongoDB ObjectID or an integer.
   *
   * If the `id` value is not a string, or does not match the requirements for
   * the above, the `id` value will be returned as-is.
   *
   * @param {*} id
   */
  static coerceID(id) {
    if (typeof id !== 'string') return id;
    if (/^[a-f0-9]{24}$/.test(id)) return new ObjectID(id);
    if (/^\d+$/.test(id)) return Number(id);
    return id;
  }

  /**
   * Extracts a mutation value from a document for the provided type and field.
   *
   * @param {object} doc The MongoDB document to extract from.
   * @param {string} type The mutation type, e.g. `Website`.
   * @param {string} field The field key of the mutation.
   */
  static extractMutationValue(doc, type, field) {
    const path = `mutations.${type}.${field}`;
    return BaseDB.get(doc, path, null);
  }

  /**
   * Gets a Mongo ID from either a complex (DBRef) or simple (ID) reference.
   *
   * @param {*} ref The reference value.
   */
  static extractRefId(ref) {
    const id = isObject(ref) && ref.oid ? ref.oid : ref;
    return BaseDB.coerceID(id) || null;
  }

  /**
   * Gets an array of Mongo IDs from an array
   * of either complex (DBRef) or simple (ID) references.
   *
   * @param {array} refs
   */
  static extractRefIds(refs) {
    if (!isArray(refs) || !refs.length) return [];
    return refs.map(ref => BaseDB.extractRefId(ref)).filter(id => id);
  }

  /**
   * Fills a mutation value from a document for the provided type and field.
   * If a mutation value is found, it will use it, otherwise it will
   * fallback to the "standard" field on the document.
   *
   * @param {object} doc
   * @param {string} type
   * @param {string} field
   */
  static fillMutation(doc, type, field) {
    const value = BaseDB.extractMutationValue(doc, type, field);
    return value || doc[field];
  }

  /**
   * Gets the value from a document for the provided path.
   * By default, if not found, will return null.
   * This can be changed by set the `def` argument.
   *
   * @param {object} doc The document.
   * @param {string} path The object path, e.g. `name` or `foo.bar.baz` for deep traversal.
   * @param {*} [def=null] The default value to return if the value is not found.
   */
  static get(doc, path, def = null) {
    return objectPath.get(doc, path, def);
  }

  /**
   * Gets the value from a document for the provided path as an array.
   *
   * @param {object} doc The document.
   * @param {string} path The object path, e.g. `name` or `foo.bar.baz` for deep traversal.
   * @return {array}
   */
  static getAsArray(doc, path) {
    const value = objectPath.get(doc, path, []);
    return isArray(value) ? value : [];
  }

  /**
   * Returns an empty paginated response.
   */
  static paginateEmpty() {
    return paginateEmpty();
  }

  /**
   * Parses a model name into its namespace and resource parts.
   *
   * For example, `platform.Content` becomes `{ namespace: 'platform', resource: 'Content' }`
   *
   * @param {string} name
   * @returns {object}
   */
  static parseModelName(name) {
    const [namespace, resource] = name.split('.');
    return { namespace, resource };
  }

  /**
   * Creates a new `Error` object with the provided message and status code.
   *
   * @param {string} message
   * @param {number} statusCode
   */
  static error(message, statusCode) {
    const err = new Error(message);
    err.statusCode = Number(statusCode);
    return err;
  }
}

module.exports = BaseDB;
