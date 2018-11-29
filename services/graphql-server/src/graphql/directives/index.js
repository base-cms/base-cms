const ApplyInterfaceDirective = require('./apply-interface');
const ArrayValueDirective = require('./array-value');
const FindManyDirective = require('./find-many');
const FindOneDirective = require('./find-one');
const MomentFormatDirective = require('./moment-format');
const MutatedValueDirective = require('./mutated-value');
const RefManyDirective = require('./ref-many');
const RefOneDirective = require('./ref-one');
const RelatedContentDirective = require('./related-content');
const ValueDirective = require('./value');

module.exports = {
  applyInterfaceFields: ApplyInterfaceDirective,
  arrayValue: ArrayValueDirective,
  findMany: FindManyDirective,
  findOne: FindOneDirective,
  momentFormat: MomentFormatDirective,
  mutatedValue: MutatedValueDirective,
  refMany: RefManyDirective,
  refOne: RefOneDirective,
  relatedContent: RelatedContentDirective,
  value: ValueDirective,
};
