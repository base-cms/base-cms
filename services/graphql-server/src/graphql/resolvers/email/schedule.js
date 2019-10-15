const { BaseDB, MongoDB } = require('@base-cms/db');
const { Base4RestPayload } = require('@base-cms/base4-rest-api');
const { dasherize } = require('@base-cms/inflector');
const getProjection = require('../../utils/get-projection');

const validateRest = require('../../utils/validate-rest');

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
    /**
     *
     */
    updateEmailSchedule: async (_, { input }, { base4rest, basedb }, info) => {
      validateRest(base4rest);
      const { id, payload } = input;
      const {
        status,
        sectionId,
        deploymentDate,
        sequence,
      } = payload;

      const [section, schedule] = await Promise.all([
        basedb.strictFindOne('email.Section', { _id: sectionId }, { projection: { deployment: 1 } }),
        basedb.strictFindOne('email.Schedule', { _id: id }, { projection: { _id: 1 } }),
      ]);

      // Ensure seconds and milliseconds are set to 0.
      clearSeconds(deploymentDate);

      const deploymentId = BaseDB.extractRefId(section.deployment);
      if (!deploymentId) throw new Error(`Unable to extract a deployment ID for section ${section._id}.`);

      const body = new Base4RestPayload({ type: 'email/schedule' });
      body
        .set('id', schedule._id)
        .set('deploymentDate', deploymentDate)
        .set('status', status)
        .set('sequence', sequence == null ? 0 : sequence) // set null/undefined to 0
        .setLink('product', { id: deploymentId, type: 'email/product/deployment' })
        .setLink('section', { id: section._id, type: 'email/section' });

      await base4rest.updateOne({ model: 'email/schedule', id: schedule._id, body });

      const {
        fieldNodes,
        schema,
        fragments,
      } = info;
      const projection = getProjection(schema, schema.getType('EmailSchedule'), fieldNodes[0].selectionSet, fragments);
      return basedb.strictFindOne('email.Schedule', { _id: schedule._id }, { projection });
    },

    /**
     *
     */
    deleteEmailSchedule: async (_, { input }, { base4rest }) => {
      const { id } = input;
      validateRest(base4rest);
      await base4rest.removeOne({ model: 'email/schedule', id });
      return 'ok';
    },

    /**
     *
     */
    quickCreateEmailSchedules: async (_, { input }, { basedb, base4rest, load }, info) => {
      validateRest(base4rest);
      const { contentId, sectionIds, deploymentDates } = input;

      const [content, sections] = await Promise.all([
        load('platformContent', contentId, { type: 1 }),
        basedb.find('email.Section', { _id: { $in: sectionIds } }, { projection: { deployment: 1 } }),
      ]);

      const bodies = sections.reduce((arr, section) => {
        const deploymentId = BaseDB.extractRefId(section.deployment);
        if (!deploymentId) throw new Error(`Unable to extract a deployment ID for section ${section._id}.`);
        deploymentDates.forEach((deploymentDate) => {
          clearSeconds(deploymentDate);
          const body = new Base4RestPayload({ type: 'email/schedule' });
          body
            .set('deploymentDate', deploymentDate)
            .set('status', 1)
            .setLink('product', { id: deploymentId, type: 'email/product/newsletter' })
            .setLink('section', { id: section._id, type: 'email/section' })
            .setLink('content', { id: content._id, type: `platform/content/${dasherize(content.type)}` });
          arr.push(body);
        });
        return arr;
      }, []);

      const responses = await base4rest.insertMany({ model: 'email/schedule', bodies });
      const ids = responses.map(({ data }) => ObjectID(data.id));

      const {
        fieldNodes,
        schema,
        fragments,
      } = info;
      const projection = getProjection(schema, schema.getType('EmailSchedule'), fieldNodes[0].selectionSet, fragments);
      return basedb.find('email.Schedule', { _id: { $in: ids } }, { projection });
    },
  },
};
