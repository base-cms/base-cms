module.exports = {
  email: {
    Section: {
      query: [
        { status: 1, 'deployment.$id': 1 },
      ],
      sort: [
        [{ name: 1, _id: 1 }, { collation: { locale: 'en_US' } }],
        [{ fullName: 1, _id: 1 }, { collation: { locale: 'en_US' } }],
        { sequence: 1, _id: 1 },
      ],
    },
  },
  magazine: {
    Issue: {
      query: [
        { status: 1, _id: 1 },
        { status: 1, mailDate: -1, 'publication.$id': 1 },
      ],
      sort: [
        [{ name: 1, _id: 1 }, { collation: { locale: 'en_US' } }],
        { mailDate: 1, _id: 1 },
      ],
    },
    Section: {
      query: [
        { status: 1, _id: 1 },
        { status: 1, 'issue.$id': 1 },
        { status: 1, 'publication.$id': 1 },
      ],
      sort: [
        [{ name: 1, _id: 1 }, { collation: { locale: 'en_US' } }],
        [{ fullName: 1, _id: 1 }, { collation: { locale: 'en_US' } }],
        { sequence: 1, _id: 1 },
      ],
    },
  },
  platform: {
    Asset: {
      query: [
        { type: 1, _id: 1 },
      ],
      sort: [
        [{ name: 1, _id: 1 }, { collation: { locale: 'en_US' } }],
        { touched: 1, _id: 1 },
        [{ filePath: 1, _id: 1 }, { collation: { locale: 'en_US' } }],
        [{ fileName: 1, _id: 1 }, { collation: { locale: 'en_US' } }],
      ],
    },
    Content: {
      query: [
        { status: 1, type: 1, _id: 1 },
        { status: 1, hash: 1 },
        {
          status: 1,
          type: 1,
          published: 1,
          unpublished: 1,
          'mutations.Website.primarySection.$id': 1,
        },
        {
          status: 1,
          type: 1,
          published: 1,
          unpublished: 1,
          primaryImage: 1,
        },
        // Section query indexes
        { 'sectionQuery.sectionId': 1, 'sectionQuery.optionId': 1 },
        { 'sectionQuery.sectionId': 1, 'sectionQuery.optionId': 1, primaryImage: 1 },
        { status: 1, type: 1, venue: 1 },
        // Needed for related content queries
        { 'relatedTo.$id': 1 },
        { company: 1 },
        // @todo confirm this index covers primary site queries!
        { 'mutations.Website.primarySite': 1 },
      ],
      sort: [
        [{ name: 1, _id: 1 }, { collation: { locale: 'en_US' } }],
        { updated: 1, _id: 1 },
        { created: 1, _id: 1 },
        { published: 1, _id: 1 },
        [{ startDate: 1, _id: 1 }, { sparse: true }],
        [{ endDate: 1, _id: 1 }, { sparse: true }],
        // Section query sort
        { 'sectionQuery.start': -1, _id: -1 },
        { 'sectionQuery.end': -1, _id: -1 },
      ],
    },
    Product: {
      query: [
        { status: 1, type: 1, _id: 1 },
        { status: 1, type: 1, alias: 1 }, // for newsletter products
      ],
      sort: [
        [{ sequence: 1, _id: 1 }],
        [{ name: 1, _id: 1 }, { collation: { locale: 'en_US' } }],
        [{ fullName: 1, _id: 1 }, { collation: { locale: 'en_US' } }],
      ],
    },
    Taxonomy: {
      query: [
        { status: 1, _id: 1 },
        { status: 1, type: 1, _id: 1 },
        { status: 1, 'parent.$id': 1 },
        { status: 1, type: 1, 'parent.$id': 1 },
      ],
      sort: [
        [{ name: 1, _id: 1 }, { collation: { locale: 'en_US' } }],
        [{ fullName: 1, _id: 1 }, { collation: { locale: 'en_US' } }],
        { sequence: 1, _id: 1 },
      ],
    },
  },
  website: {
    Redirects: {
      query: [
        [{ siteId: 1, from: 1 }, { unique: true }],
      ],
    },
    Option: {
      query: [
        { status: 1, _id: 1 },
        { status: 1, name: 1 }, // Non-standard: find by name.
        { status: 1, 'site.$id': 1 },
      ],
      sort: [
        [{ name: 1, _id: 1 }, { collation: { locale: 'en_US' } }],
      ],
    },
    Section: {
      query: [
        { status: 1, _id: 1 }, // @todo require the site id?
        { status: 1, alias: 1 }, // @todo remove this for site index?
        { status: 1, 'site.$id': 1, alias: 1 },
        { status: 1, 'site.$id': 1, redirects: 1 },
        { status: 1, redirects: 1 }, // @todo remove this for site index?
        { status: 1, 'parent.$id': 1 },
        { status: 1, 'site.$id': 1, 'parent.$id': 1 },
      ],
      sort: [
        [{ name: 1, _id: 1 }, { collation: { locale: 'en_US' } }],
        [{ fullName: 1, _id: 1 }, { collation: { locale: 'en_US' } }],
        { sequence: 1, _id: 1 },
      ],
    },
  },
};
