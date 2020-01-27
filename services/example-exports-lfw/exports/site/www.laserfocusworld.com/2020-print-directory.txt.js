const gql = require('graphql-tag');
const { getAsArray, getAsObject } = require('@base-cms/object-path');

const query = gql`
query Issue5513Content{
  magazineScheduledContent(input: {issueId: 61165}) {
    edges {
      node {
        id
        name
        # @todo magazineSchedules, with filtering?
        websiteSchedules {
          section {
            id
            name
          }
        }
      }
    }
  }
}
`;

module.exports = async ({ apollo }) => {
  const { data } = await apollo.query({ query });
  const companies = getAsArray(data, 'magazineScheduledContent.edges').map(({ node }) => node);

  const segments = companies.reduce((obj, company) => {
    const { section } = getAsObject(company, 'websiteSchedules.0') || { section: { id: 0, name: 'None' } };

    const sObj = obj[section.id] || { name: section.name, content: [] };
    return {
      ...obj,
      [section.id]: {
        name: sObj.name,
        content: [
          ...sObj.content,
          company,
        ],
      },
    };
  }, {});
  const sections = Object.keys(segments).map(k => segments[k]);

  // @todo should there be a formatter?
  return [
    '<ASCII-MAC>',
    // Paragraph styles,
    ...sections.map(({ name, content }) => ([
      `<ParaStyle:Section>${name}`,
      ...content.map(c => `<ParaStyle:Company>${c.name}`),
    ].join('\n'))),
  ];
};
