const ApplyInterfaceDirective = require('./apply-interface');
const ArrayValueDirective = require('./array-value');
const FindManyDirective = require('./find-many');
const FindOneDirective = require('./find-one');
const RefManyDirective = require('./ref-many');
const RefOneDirective = require('./ref-one');
const ValueDirective = require('./value');

module.exports = {
  applyInterfaceFields: ApplyInterfaceDirective,
  arrayValue: ArrayValueDirective,
  findMany: FindManyDirective,
  findOne: FindOneDirective,
  refMany: RefManyDirective,
  refOne: RefOneDirective,
  value: ValueDirective,
};
