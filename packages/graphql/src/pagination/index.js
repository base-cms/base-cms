const deepMerge = require('deepmerge');
const isPlainObject = require('is-plain-object');
const objectPath = require('object-path');
const Limit = require('./limit');
const Sort = require('./sort');

const { isArray } = Array;
const mergeOptions = { isMergeableObject: isPlainObject };
const collatableFields = [
  'name',
  'fullName',
];

class Pagination {
  /**
   * Constructor.
   *
   * @param {object} db The db service instance. Passed from resolver context.
   * @param {string} modelName The target model name to query.
   * @param {object} params The criteria, pagination, and sort params.
   * @param {object} params.criteria Query criteria to apply to the paginated query.
   * @param {object} params.pagination The pagination parameters.
   * @param {number} params.pagination.first The number of documents to return.
   *                                         Will default the the limit classes default.
   * @param {*} params.pagination.after The ID to start querying from.
   *                                    Should not be an obfuscated cursor value.
   * @param {array} params.sort The sort parameters
   * @param {string} params.sort.field The sort field name.
   * @param {string} params.sort.order The sort order. Either 1/-1 or asc/desc.
   * @param {?object} params.projection The field projection (fields to return).
   * @param {object} options Additional sort, limit and criteria merge options.
   *                         See the corresponding classes.
   */
  constructor(db, modelName, {
    criteria = {},
    pagination = {},
    sort = {},
    projection,
  } = {}, options = {}) {
    this.promises = {};

    // Set the db service to use for querying.
    this.db = db;
    this.modelName = modelName;

    // Set/merge any query criteria.
    this.criteria = deepMerge({}, criteria, mergeOptions);

    // Set the limit and after cursor.
    const { first, after } = pagination;
    this.first = new Limit(first, options.limit);
    this.after = after;

    // Set the sort criteria.
    const { field, order } = sort;
    this.sort = new Sort(field, order, options.sort);

    // Set the projection.
    this.projection = projection;
  }

  /**
   * Gets the total number of documents found.
   * Based on any initially set query criteria.
   *
   * @return {Promise}
   */
  getTotalCount() {
    const run = () => this.db.call('count', { modelName: this.modelName, query: this.criteria });
    if (!this.promises.count) {
      this.promises.count = run();
    }
    return this.promises.count;
  }

  /**
   * Gets the document edges for the current limit and sort.
   *
   * @return {Promise}
   */
  getEdges() {
    const run = async () => {
      const criteria = await this.getQueryCriteria();
      const opts = {};
      if (this.projection) {
        opts.projection = this.projection;
      }
      if (this.shouldCollate()) {
        opts.collation = this.sort.collation;
      }

      const cursor = await this.collection
        .find(criteria, opts)
        .sort(this.sort.value)
        .limit(this.first.value);
      const docs = await cursor.toArray();
      return docs.map(doc => ({ node: doc, cursor: doc._id }));
    };
    if (!this.promises.edge) {
      this.promises.edge = run();
    }
    return this.promises.edge;
  }

  /**
   * Gets the end cursor value of the current limit and sort.
   * In this case, the cursor will be the document id, non-obfuscated.
   *
   * @return {Promise}
   */
  getEndCursor() {
    const run = async () => {
      const edges = await this.getEdges();
      if (!edges.length) return null;
      return edges[edges.length - 1].cursor;
    };
    if (!this.promises.cursor) {
      this.promises.cursor = run();
    }
    return this.promises.cursor;
  }

  /**
   * Determines if another page is available.
   *
   * @return {Promise}
   */
  async hasNextPage() {
    const run = async () => {
      const criteria = await this.getQueryCriteria();
      const opts = { projection: { _id: 1 } };
      if (this.shouldCollate()) {
        opts.collation = this.sort.collation;
      }

      const count = await this.collection.find(criteria, opts)
        .skip(this.first.value)
        .sort(this.sort.value)
        .limit(1)
        .count(true);
      return Boolean(count);
    };
    if (!this.promises.nextPage) {
      this.promises.nextPage = run();
    }
    return this.promises.nextPage;
  }

  /**
   * @private
   * @param {string} id
   * @param {object} projection
   * @return {Promise}
   */
  findCursorModel(id, projection) {
    const run = async () => {
      const doc = await this.collection.findOne({ _id: id }, { projection });
      if (!doc) throw new Error(`No record found for ID '${id}'`);
      return doc;
    };
    if (!this.promises.model) {
      this.promises.model = run();
    }
    return this.promises.model;
  }

  /**
   * @private
   * @return {Promise}
   */
  getQueryCriteria() {
    const run = async () => {
      const { field, order } = this.sort;

      const filter = deepMerge({}, this.criteria, mergeOptions);
      const limits = {};
      const ors = [];

      if (this.after) {
        let doc;
        const op = order === 1 ? '$gt' : '$lt';
        if (field === '_id') {
          // Sort by ID only.
          doc = await this.findCursorModel(this.after, { _id: 1 });
          if (isArray(filter.$and)) {
            filter.$and.push({ _id: { [op]: doc._id } });
          } else if (filter._id) {
            filter.$and = [{ _id: { [op]: doc._id } }];
          } else {
            filter._id = { [op]: doc._id };
          }
        } else {
          doc = await this.findCursorModel(this.after, { [field]: 1 });
          limits[op] = objectPath.get(doc, field);
          ors.push({
            [field]: objectPath.get(doc, field),
            _id: { [op]: doc._id },
          });
          if (isArray(filter.$or)) {
            filter.$or = filter.$or.concat([{ [field]: limits }, ...ors]);
          } else {
            filter.$or = [{ [field]: limits }, ...ors];
          }
        }
      }
      return filter;
    };

    if (!this.promises.criteria) {
      this.promises.criteria = run();
    }
    return this.promises.criteria;
  }

  /**
   * Determines if collation should be used.
   *
   * @returns {boolean}
   */
  shouldCollate() {
    const { field } = this.sort;
    return collatableFields.includes(field);
  }
}

module.exports = Pagination;
