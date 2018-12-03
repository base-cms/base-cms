module.exports = {
  email: {
    Section: {
      query: [
        { status: 1, 'deployment.$id': 1 },
      ],
      sort: [
        { name: 1, _id: 1 }, { collation: { locale: 'en_US' } },
        { fullName: 1, _id: 1 }, { collation: { locale: 'en_US' } },
        { sequence: 1, _id: 1 },
      ],
    },
  },
  magazine: {},
  platform: {
    Asset: {
      query: [
        { type: 1, _id: 1 },
      ],
      sort: [
        { name: 1, _id: 1 }, { collation: { locale: 'en_US' } },
        { touched: 1, _id: 1 },
        { filePath: 1, _id: 1 }, { collation: { locale: 'en_US' } },
        { fileName: 1, _id: 1 }, { collation: { locale: 'en_US' } },
      ],
    },
    Product: {
      query: [
        { type: 1, status: 1, _id: 1 },
      ],
      sort: [
        { name: 1, _id: 1 }, { collation: { locale: 'en_US' } },
        { fullName: 1, _id: 1 }, { collation: { locale: 'en_US' } },
      ],
    },
  },
  website: {
    Option: {
      query: [
        { status: 1, _id: 1 },
        { status: 1, 'site.$id': 1 },
      ],
      sort: [
        { name: 1, _id: 1 }, { collation: { locale: 'en_US' } },
      ],
    },
    Section: {
      query: [
        { status: 1, _id: 1 },
        { status: 1, alias: 1 },
        { status: 1, redirects: 1 },
        { status: 1, 'parent.$id': 1 },
        { status: 1, 'site.$id': 1, 'parent.$id': 1 },
      ],
      sort: [
        { name: 1, _id: 1 }, { collation: { locale: 'en_US' } },
        { fullName: 1, _id: 1 }, { collation: { locale: 'en_US' } },
        { sequence: 1, _id: 1 },
      ],
    },
  },
};
