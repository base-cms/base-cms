const ApplyInterfaceDirective = require('./apply-interface');
const ArrayValueDirective = require('./array-value');
const DeprecatedDirective = require('./deprecated');
const FindManyDirective = require('./find-many');
const FindOneDirective = require('./find-one');
const MatchManyDirective = require('./match-many');
const MomentFormatDirective = require('./moment-format');
const MutatedValueDirective = require('./mutated-value');
const ProjectUsingDirective = require('./project-using');
const ProjectionDirective = require('./projection');
const RefManyDirective = require('./ref-many');
const RefOneDirective = require('./ref-one');
const RequiresAuthDirective = require('./requires-auth');
const RequiresProjectDirective = require('./requires-project');
const ValueDirective = require('./value');

module.exports = {
  applyInterfaceFields: ApplyInterfaceDirective,
  arrayValue: ArrayValueDirective,
  deprecated: DeprecatedDirective,
  findMany: FindManyDirective,
  findOne: FindOneDirective,
  matchMany: MatchManyDirective,
  momentFormat: MomentFormatDirective,
  mutatedValue: MutatedValueDirective,
  projectUsing: ProjectUsingDirective,
  projection: ProjectionDirective,
  refMany: RefManyDirective,
  refOne: RefOneDirective,
  requiresAuth: RequiresAuthDirective,
  requiresProject: RequiresProjectDirective,
  value: ValueDirective,
};
