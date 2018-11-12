const { ObjectID } = require('mongodb');
const MongoClient = require('./mongodb');
const isObject = require('./is-object');

const { isArray } = Array;

/**
 * The Base4 collection namespaces.
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
   * @param {object} baseOpts The Base connection options.
   * @param {string} baseOpts.url The Base MongoDB URL to connect to.
   * @param {string} baseOpts.tenant The Base tenant key, e.g. `cygnus_ofcr`.
   * @param {object} [options] Options to pass to `MongoClient.connect`.
   */
  constructor({ url, tenant } = {}, options) {
    this.tenant(tenant);
    this.dbOptions = options;
    this.client = new MongoClient(url, options);
  }

  /**
   * Finds a single document for the provided model name and ID.
   *
   * @param {string} modelName The model name, e.g. `platform.Content`.
   * @param {string|number|ObjectID} id The model identifier.
   * @param {object} [options] Options to pass to `Collection.findOne`.
   * @return {Promise<object|null>}
   */
  findById(modelName, id, options) {
    return this.findOne(modelName, { _id: id }, options);
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
    const { namespace, resource } = BaseDB.parseModelName(modelName);
    const coll = await this.collection(namespace, resource);
    return coll.findOne(query, options);
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
   * Sets the tenant.
   *
   * @param {string} key The Base tenant key, e.g. `cygnus_ofcr`.
   */
  tenant(key) {
    this.tenant = key;
    return this;
  }

  /**
   * @param {string} namespace The model namespace, e.g. `platform` or `website`.
   * @param {object} [options] Options to pass to the `MongoClient.db` call.
   */
  db(namespace, options) {
    return this.client.db(this.dbNameFor(namespace), options);
  }

  /**
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
      throw BaseDB.error(`The provided Base namespace '${namespace}' is invalid.`, 400);
    }
    return `${this.tenant}_${namespace}`;
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
    const { mutations } = doc;
    if (!isObject(mutations)) return null;
    const keyValues = mutations[type];
    if (!isObject(keyValues)) return null;
    return keyValues[field];
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
