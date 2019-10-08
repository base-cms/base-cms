const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  websiteSchedule(input: WebsiteScheduleQueryInput = {}): WebsiteSchedule @findOne(
    model: "website.Schedule",
    using: { id: "_id" },
    withSite: true,
    siteField: "product"
  )
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

input WebsiteScheduleQueryInput {
  siteId: ObjectID
  status: ModelStatus = active
  id: ObjectID!
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

`;
