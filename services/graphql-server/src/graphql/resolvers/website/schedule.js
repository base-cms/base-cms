const { BaseDB, MongoDB } = require('@base-cms/db');
const { Base4RestPayload } = require('@base-cms/base4-rest-api');
const { dasherize } = require('@base-cms/inflector');
const { UserInputError } = require('apollo-server-express');

const validateRest = require('../../utils/validate-rest');
const getProjection = require('../../utils/get-projection');

const { ObjectID } = MongoDB;

const clearSeconds = (date) => {
  if (date) {
    date.setSeconds(0);
    date.setMilliseconds(0);
  }
};

module.exports = {
  /**
   *
   */
  Mutation: {
    updateWebsiteSchedule: async (_, { input }, { base4rest, basedb }, info) => {
      validateRest(base4rest);
      const { id, payload } = input;
      const {
        status,
        sectionId,
        optionId,
        startDate,
        endDate,
      } = payload;
      const [section, option, schedule] = await Promise.all([
        basedb.strictFindOne('website.Section', { _id: sectionId }, { projection: { 'site.$id': 1 } }),
        basedb.strictFindOne('website.Option', { _id: optionId }, { projection: { 'site.$id': 1 } }),
        basedb.strictFindOne('website.Schedule', { _id: id }, { projection: { _id: 1 } }),
      ]);
      if (endDate && endDate.valueOf() < startDate.valueOf()) {
        throw new UserInputError('The end date cannot be before the start date.');
      }

      // Ensure seconds and milliseconds are set to 0.
      clearSeconds(startDate);
      if (endDate) clearSeconds(endDate);

      const sectionSiteId = BaseDB.extractRefId(section.site);
      if (!sectionSiteId) throw new Error(`Unable to extract a site ID for section ${section._id}.`);

      const optionSiteId = BaseDB.extractRefId(option.site);
      if (!optionSiteId) throw new Error(`Unable to extract a site ID for option ${option._id}.`);

      if (`${sectionSiteId}` !== `${optionSiteId}`) throw new UserInputError('The section and option site IDs do not match');

      const body = new Base4RestPayload({ type: 'website/schedule' });
      body
        .set('id', schedule._id)
        .set('startDate', startDate)
        .set('endDate', endDate || null)
        .set('status', status)
        .setLink('product', { id: sectionSiteId, type: 'website/product/site' })
        .setLink('section', { id: section._id, type: 'website/section' })
        .setLink('option', { id: option._id, type: 'website/option' });

      await base4rest.updateOne({ model: 'website/schedule', id: schedule._id, body });

      const {
        fieldNodes,
        schema,
        fragments,
      } = info;
      const projection = getProjection(schema, schema.getType('WebsiteSchedule'), fieldNodes[0].selectionSet, fragments);
      return basedb.strictFindOne('website.Schedule', { _id: schedule._id }, { projection });
    },

    /**
     *
     */
    deleteWebsiteSchedule: async (_, { input }, { base4rest }) => {
      const { id } = input;
      validateRest(base4rest);
      await base4rest.removeOne({ model: 'website/schedule', id });
      return 'ok';
    },

    /**
     *
     */
    quickCreateWebsiteSchedules: async (_, { input }, { basedb, base4rest, load }, info) => {
      validateRest(base4rest);

      const { contentId, sectionIds } = input;
      const [content, sections] = await Promise.all([
        load('platformContent', contentId, { status: 1, published: 1, type: 1 }),
        basedb.find('website.Section', { _id: { $in: sectionIds } }, { projection: { site: 1 } }),
      ]);

      const startDate = content.status === 1 && content.published ? content.published : new Date();
      const opts = new Map();
      const bodies = await Promise.all(sections.map(async (section) => {
        const siteId = BaseDB.extractRefId(section.site);
        if (!siteId) throw new Error(`Unable to extract a site ID for section ${section._id}.`);

        const option = opts.has(`${siteId}`)
          ? opts.get(`${siteId}`)
          : await basedb.strictFindOne('website.Option', { name: 'Standard', status: 1, 'site.$id': siteId }, { projection: { _id: 1 } });
        opts.set(`${siteId}`, option);

        const payload = new Base4RestPayload({ type: 'website/schedule' });
        payload
          .set('startDate', startDate)
          .set('status', 1)
          .setLink('product', { id: siteId, type: 'website/product/site' })
          .setLink('section', { id: section._id, type: 'website/section' })
          .setLink('option', { id: option._id, type: 'website/option' })
          .setLink('content', { id: content._id, type: `platform/content/${dasherize(content.type)}` });

        return payload;
      }));

      const responses = await base4rest.insertMany({ model: 'website/schedule', bodies });
      const ids = responses.map(({ data }) => ObjectID(data.id));

      const {
        fieldNodes,
        schema,
        fragments,
      } = info;
      const projection = getProjection(schema, schema.getType('Content'), fieldNodes[0].selectionSet, fragments);
      return basedb.find('website.Schedule', { _id: { $in: ids } }, { projection });
    },
  },
};
