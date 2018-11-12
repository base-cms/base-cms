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
      throw new Error(`The provided Base namespace '${namespace}' is invalid.`);
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
}

module.exports = BaseDB;
