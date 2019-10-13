const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  websiteSchedule(input: WebsiteScheduleQueryInput!): WebsiteSchedule @findOne(
    model: "website.Schedule",
    using: { id: "_id" },
    withSite: true,
    siteField: "product"
  )
  contentWebsiteSchedules(input: ContentWebsiteSchedulesQueryInput!): WebsiteScheduleConnection! @findMany(
    model: "website.Schedule",
    using: { contentId: "content.$id" },
    withSite: true,
    siteField: "product"
  )
}

extend type Mutation {
  quickCreateWebsiteSchedules(input: QuickCreateWebsiteSchedulesMutationInput!): [WebsiteSchedule!]!
  updateWebsiteSchedule(input: UpdateWebsiteScheduleMutationInput!): WebsiteSchedule!
  deleteWebsiteSchedule(input: DeleteWebsiteScheduleMutationInput!): String!
}

type WebsiteSchedule {
  # fields from platform.model::Schedule
  id: ObjectID @projection(localField: "_id") @value(localField: "_id")
  site(input: WebsiteScheduleSiteInput = {}): WebsiteSite @projection(localField: "product") @refOne(
    loader: "platformProduct",
    localField: "product"
    withSite: true,
    siteField: "_id"
    criteria: "websiteSite",
  )
  content(input: WebsiteScheduleContentInput = {}): Content @projection @refOne(
    loader: "platformContent",
    criteria: "content"
  )
  section(input: WebsiteScheduleSectionInput = {}): WebsiteSection @projection @refOne(loader: "websiteSection")
  option(input: WebsiteScheduleOptionInput = {}): WebsiteOption @projection @refOne(loader: "websiteOption")
  startDate: Date @projection
  endDate: Date @projection

  # fields from trait.platform::StatusEnabled
  status: Int @projection
}

enum WebsiteScheduleSortField {
  id
  startDate
}

type WebsiteScheduleConnection @projectUsing(type: "WebsiteSchedule") {
  totalCount: Int!
  edges: [WebsiteScheduleEdge]!
  pageInfo: PageInfo!
}

type WebsiteScheduleEdge {
  node: WebsiteSchedule!
  cursor: String!
}

input WebsiteScheduleQueryInput {
  siteId: ObjectID
  status: ModelStatus = active
  id: ObjectID!
}

input ContentWebsiteSchedulesQueryInput {
  contentId: Int!
  status: ModelStatus = active
  siteId: ObjectID
  sort: WebsiteSectionSortInput = {}
  pagination: PaginationInput = {}
}

input WebsiteScheduleSortInput {
  field: WebsiteScheduleSortField = id
  order: SortOrder = desc
}

input WebsiteScheduleSiteInput {
  siteId: ObjectID
  status: ModelStatus = active
}

input WebsiteScheduleContentInput {
  status: ModelStatus = active
}

input WebsiteScheduleSectionInput {
  status: ModelStatus = active
}

input WebsiteScheduleOptionInput {
  status: ModelStatus = active
}

input QuickCreateWebsiteSchedulesMutationInput {
  contentId: Int!
  sectionIds: [Int!]!
}

input DeleteWebsiteScheduleMutationInput {
  id: ObjectID!
}

input UpdateWebsiteScheduleMutationInput {
  id: ObjectID!
  payload: UpdateWebsiteSchedulePayloadInput!
}

input UpdateWebsiteSchedulePayloadInput {
  status: Int = 1
  sectionId: Int!
  optionId: Int!
  startDate: Date!
  endDate: Date
}

`;
