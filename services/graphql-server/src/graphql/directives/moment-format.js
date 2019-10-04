const { SchemaDirectiveVisitor } = require('graphql-tools');
const moment = require('moment-timezone');
const { get } = require('@base-cms/object-path');

class MomentFormatDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (doc, { input }, { site }) => {
      const { localField } = this.args;

      const value = get(doc, localField || field.name);
      if (!(value instanceof Date)) return value;

      const format = input && input.format ? input.format : site.date.format;
      const timezone = input && input.timezone ? input.timezone : site.date.timezone;

      return moment(value).tz(timezone).format(format);
    };
  }
}

module.exports = MomentFormatDirective;
