const EmailXConfiguration = require('@base-cms/marko-newsletters-email-x/config');

const config = new EmailXConfiguration('https://ebm.serve.email-x.io');
config
  .setAdUnits('equipment-weekly', [
    {
      name: 'leaderboardPrimary',
      id: '5df1578dd30077fa36f2ae8d',
      width: 580,
      height: 80,
    },
    {
      name: 'leaderboardSecondary',
      id: '5dfa7deed3007700f7f34176',
      width: 580,
      height: 80,
    },
  ])
  .setAdUnits('fleet-owner-newsline', [
    {
      name: 'leaderboardPrimary',
      id: '5ded47c676787ab38911e38b',
      width: 580,
      height: 80,
    },
    {
      name: 'leaderboardSecondary',
      id: '5df79fd7d300772175f2e724',
      width: 580,
      height: 80,
    },
    {
      name: 'leaderboardTertiary',
      id: '5df7a020d3007739f2f2e747',
      width: 580,
      height: 80,
    },
  ])
  .setAdUnits('heavy-duty-pickup-van', [
    {
      name: 'leaderboardPrimary',
      id: '5df24f36d30077482ef2b38a',
      width: 580,
      height: 80,
    },
  ])
  .setAdUnits('info-tech', [
    {
      name: 'leaderboardPrimary',
      id: '5df7d0e076787a5327126a80',
      width: 580,
      height: 80,
    },
    {
      name: 'leaderboardSecondary',
      id: '5dfa7e2476787a6e4d12af97',
      width: 580,
      height: 80,
    },
  ])
  .setAdUnits('regulation-resource-center', [
    {
      name: 'leaderboardPrimary',
      id: '5dfa854776787a49c812b00f',
      width: 580,
      height: 80,
    },
  ])
  .setAdUnits('top-5', [
    {
      name: 'leaderboardPrimary',
      id: '5dfa7e6cd3007720dff341da',
      width: 580,
      height: 80,
    },
  ])
  .setAdUnits('maintenance-matters', [
    {
      name: 'leaderboardPrimary',
      id: '5ea200cad3e7011a83baf7f7',
      width: 580,
      height: 80,
    },
  ]);
module.exports = config;
