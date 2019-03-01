const { SafeString } = require('../engine').handlebars;

module.exports = ({ hash }) => {
  const { tagName = 'div', className, size } = hash;
  return new SafeString(`
    <${tagName} class="text-center ${className}">
      <img src="https://dummyimage.com/${size}/ccc/000}" alt="${size} Advertisement" />
    </${tagName}>
  `);
};
