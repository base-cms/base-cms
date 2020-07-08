const { get } = require('@base-cms/object-path');

module.exports = (node, fallbackValue = '') => {
  const { labels = [] } = node;
  const sponsored = labels.includes('Sponsored') || labels.includes('Sponsored By');
  const companyName = get(node, 'company.name');
  if (sponsored && companyName) {
    return `Sponsored by ${companyName}`;
  }
  const label = labels[0] ? labels[0] : fallbackValue;
  return label;
};
