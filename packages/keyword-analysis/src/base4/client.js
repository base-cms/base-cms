const { ObjectID } = require('mongodb');
const isObject = require('../utils/is-object');

const { isArray } = Array;

/**
 * The Base4 collection namespaces.
 *
 * These are used to calculcate the MongoDB
 * database names.
 *
 * @type {array}
 */
const namespaces = [
  'email',
  'magazine',
  'platform',
  'website',
];

/**
 * The Base4 instance, instantiated per tenant.
 *
 * @class
 */
class Base4 {
  /**
   *
   * @param {object} params The constuctor parameters.
   * @param {object} params.db The Base4 database connection/client.
   * @param {string} params.tenantKey The Base4 tenant key, e.g. account_group.
   */
  constructor({ db, tenantKey }) {
    this.db = db;
    this.tenantKey = tenantKey;
  }

  /**
   *
   * @param {string} modelName
   * @param {object} [query={}]
   * @param {object} [options]
   */
  async find(modelName, query, options, forceArray) {
    const coll = await this.collectionFor(modelName);
    const cursor = await coll.find(query, options);
    if (forceArray) return cursor.toArray();
    return cursor;
  }

  /**
   *
   * @param {string} modelName
   * @param {object} [query={}]
   * @param {object} [options]
   */
  async count(modelName, query, options) {
    const coll = await this.collectionFor(modelName);
    return coll.countDocuments(query, options);
  }

  /**
   * Returns the collection for the provided model name.
   *
   * @param {string} modelName The namespaced model name, e.g. `platform.Content`
   */
  collectionFor(modelName) {
    const { namespace, resource } = Base4.parseModelName(modelName);
    return this.collection(namespace, resource);
  }

  /**
   *
   * @param {string} namespace The collection namespace, e.g. `platform`.
   * @param {string} resource The resource name, e.g. `Content`.
   * @returns {Promise}
   */
  collection(namespace, resource) {
    if (!namespaces.includes(namespace)) {
      throw new Error(`The provided Base4 collection namespace '${namespace}' is invalid.`);
    }
    return this.db.collection(`${this.tenantKey}_${namespace}`, resource);
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
   * Gets a Mongo ID from either a complex (DBRef) or simple (ObjectID) reference.
   *
   * @param {?array} refs
   */
  static extractRefId(ref) {
    const id = isObject(ref) && ref.oid ? ref.oid : ref;
    return Base4.coerceID(id) || null;
  }

  /**
   * Gets an array of Mongo IDs from an array
   * of either complex (DBRef) or simple (ObjectID) references.
   *
   * @param {?array} refs
   */
  static extractRefIds(refs) {
    if (!isArray(refs) || !refs.length) return [];
    return refs.map(ref => Base4.extractRefId(ref)).filter(id => id);
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
   * Fills a mutation value from a document for the provided type and field.
   * If a mutation value is found, it will use it, otherwise it will
   * fallback to the "standard" field on the document.
   *
   * @param {object} doc
   * @param {string} type
   * @param {string} field
   */
  static fillMutation(doc, type, field) {
    const value = Base4.extractMutationValue(doc, type, field);
    return value || doc[field];
  }
}

module.exports = Base4;
