const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  magazineSchedule(input: MagazineScheduleQueryInput!): MagazineSchedule @findOne(
    model: "magazine.Schedule",
    using: { id: "_id" },
  )
  contentMagazineSchedules(input: ContentMagazineSchedulesQueryInput!): MagazineScheduleConnection! @findMany(
    model: "magazine.Schedule",
    using: { contentId: "content.$id" },
  )
}

extend type Mutation {
  createMagazineSchedule(input: CreateMagazineScheduleMutationInput!): MagazineSchedule!
}

type MagazineSchedule {
  # fields from magazine.model::Schedule
  id: ObjectID! @projection(localField: "_id") @value(localField: "_id")
  publication(input: MagazineSchedulePublicationInput = {}): MagazinePublication! @projection(localField: "product") @refOne(
    loader: "platformProduct",
    localField: "product"
    criteria: "magazinePublication",
  )
  content(input: MagazineScheduleContentInput = {}): Content! @projection @refOne(
    loader: "platformContent",
    criteria: "content"
  )
  issue(input: MagazineScheduleIssueInput = {}): MagazineIssue! @projection @refOne(loader: "magazineIssue")
  section(input: MagazineScheduleSectionInput = {}): MagazineSection! @projection @refOne(loader: "magazineSection")

  # fields from trait.platform::StatusEnabled
  status: Int @projection
}

enum MagazineScheduleSortField {
  id
}

type MagazineScheduleConnection @projectUsing(type: "MagazineSchedule") {
  totalCount: Int!
  edges: [MagazineScheduleEdge]!
  pageInfo: PageInfo!
}

type MagazineScheduleEdge {
  node: MagazineSchedule!
  cursor: String!
}

input CreateMagazineScheduleMutationInput {
  contentId: Int!
  issueId: Int!
  sectionId: Int!
}

input MagazineScheduleQueryInput {
  status: ModelStatus = active
  id: ObjectID!
}

input ContentMagazineSchedulesQueryInput {
  contentId: Int!
  status: ModelStatus = active
  sort: MagazineScheduleSortInput = {}
  pagination: PaginationInput = {}
}

input MagazineScheduleSortInput {
  field: MagazineScheduleSortField = id
  order: SortOrder = desc
}

input MagazineScheduleContentInput {
  status: ModelStatus = active
}

input MagazineSchedulePublicationInput {
  status: ModelStatus = active
}

input MagazineScheduleIssueInput {
  status: ModelStatus = active
}

input MagazineScheduleSectionInput {
  status: ModelStatus = active
}


`;
