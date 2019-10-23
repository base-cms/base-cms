const { SchemaDirectiveVisitor } = require('graphql-tools');
const escapeRegex = require('escape-string-regexp');
const formatStatus = require('../utils/format-status');
const criteriaFor = require('../utils/criteria-for');
const applyInput = require('../utils/apply-input');
const shouldCollate = require('../utils/should-collate');
const connectionProjection = require('../utils/connection-projection');

const { isArray } = Array;

/**
 * Assuming a phrase of `tax tag foo`...
 *
 * Position `starts`:
 *  - Match: `any`
 *    - Where field starts with `tax`, `tag`, or `foo`
 *    - `/^tax|^tag|^foo/i`
 *  - Match: `all`
 *    - Where field literally starts with `tax tag foo`
 *    - `/^tax tag foo/i`
 *
 * Position `ends`:
 *  - Match: `any`
 *    - Where field ends with `tax`, `tag`, or `foo`
 *    - `/tax$|tag$|foo$/i`
 *  - Match: `all`
 *    - Where field literally ends with `tax tag foo`
 *    - `/tax tag foo$/i`
 *
 * Position: `exact`:
 *  - Match: `any`
 *    - Where field exactly matches `tax`, `tag`, or `foo`
 *    - `/^tax$|^tag$|^foo$/i`
 *  - Match: `all`
 *    - Where field exactly matches `tax tag foo`
 *    - `/^tax tag foo$/i`
 *
 * Position `contains`:
 *  - Match: `any`
 *    - Where field contains any partial matches of `tax`, `tag`, or `foo`
 *    - `/tax|tag|foo/i`
 *  - Match: `all`
 *    - Where field contains all partial matches of `tax`, `tag`, or `foo`
 *    - `/(?=.*tax)(?=.*tag)(?=.*foo)/i`
 */
const buildRegex = (term, position, match) => {
  const tokens = escapeRegex(term).replace(/\s\s+/, ' ').split(' ');

  if (position === 'starts') {
    // /^tax|^tag|^foo/i
    if (match === 'any') return new RegExp(`${tokens.map(t => `^${t}`).join('|')}`, 'i');
    // /^tax tag foo/i
    return new RegExp(`^${tokens.join(' ')}`, 'i');
  }
  if (position === 'ends') {
    // /tax$|tag$|foo$/i
    if (match === 'any') return new RegExp(`${tokens.map(t => `${t}$`).join('|')}`, 'i');
    // /tax tag foo$/i
    return new RegExp(`${tokens.join(' ')}$`, 'i');
  }
  if (position === 'exact') {
    // /^tax$|^tag$|^foo$/i
    if (match === 'any') return new RegExp(`${tokens.map(t => `^${t}$`).join('|')}`, 'i');
    // /^tax tag foo$/i
    return new RegExp(`^${tokens.join(' ')}$`, 'i');
  }

  // Contains...
  // /tax|tag|foo/i
  if (match === 'any') return new RegExp(`${tokens.join('|')}`, 'i');
  // /(?=.*tax)(?=.*tag)(?=.*foo)/i
  return new RegExp(`${tokens.map(t => `(?=.*${t})`).join('')}`, 'i');
};

class MatchManyDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (_, { input = {} }, { basedb, site }, info) => {
      const start = process.hrtime();

      const {
        model,
        using,
        criteria,
        withSite,
        siteField,
      } = this.args;

      const {
        status,
        pagination,
        sort,
        field: searchField,
        excludeIds = [],
        phrase,
        position,
        match,
      } = input;

      const siteId = input.siteId || site.id();

      const query = applyInput({
        query: {
          [searchField]: buildRegex(phrase, position, match),
          ...criteriaFor(criteria),
          ...formatStatus(status),
        },
        using,
        input,
        ...(withSite && siteId && { siteId, siteField }),
      });

      if (isArray(excludeIds) && excludeIds.length) {
        query._id = { $nin: excludeIds };
      }
      const projection = connectionProjection(info);
      const result = await basedb.paginate(model, {
        query,
        sort,
        projection,
        collate: shouldCollate(sort.field),
        ...pagination,
      });
      basedb.log('@matchMany', start, { model });
      return result;
    };
  }
}

module.exports = MatchManyDirective;
