const EmailXConfiguration = require('@base-cms/marko-newsletters-email-x/config');

const config = new EmailXConfiguration('https://indm.serve.email-x.io');

config.setAdUnits('ien-today', [
  {
    name: 'header',
    id: '5c7fd8a7dd5ae704948d03fb',
    width: 600,
    height: 100,
  },
]);

module.exports = config;
