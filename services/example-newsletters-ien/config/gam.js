const EmailXConfiguration = require('@base-cms/marko-newsletters-gam/config');

const config = new EmailXConfiguration('137873098');

config
  .setAdUnits('ien-today', [
    {
      name: 'header',
      path: 'IEN-Newsletters-600x100',
      width: 600,
      height: 100,
    },
  ])
  .setAdUnits('ien-update', [
    {
      name: 'header',
      path: 'IEN-Newsletters-600x100',
      width: 600,
      height: 100,
    },
  ]);

module.exports = config;
