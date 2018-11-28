const { SchemaDirectiveVisitor } = require('graphql-tools');
const moment = require('moment-timezone');
const objectPath = require('object-path');

class MomentFormatDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (doc, { input }) => {
      const {
        localField,
        defaultFormat,
        defaultTimezone,
      } = this.args;

      const value = objectPath.get(doc, localField || field.name);
      if (!(value instanceof Date)) return value;

      const format = input && input.format ? input.format : defaultFormat;
      const timezone = input && input.timezone ? input.timezone : defaultTimezone;

      // Force server-side dates to CST/CDT as done within the Base4 PHP backend.
      return moment(value).tz(timezone).format(format);
    };
  }
}

module.exports = MomentFormatDirective;
