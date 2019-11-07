const navigation = require('./navigation');

module.exports = {
  company: 'Endeavor Business Media, LLC',
  navigation,
  logos: {
    navbar: {
      src: 'https://base.imgix.net/files/base/ebm/iw/static/iw_logo.png?h=45',
      srcset: [
        'https://base.imgix.net/files/base/ebm/iw/static/iw_logo.png?h=90 2x',
      ],
    },
    footer: {
      src: 'https://base.imgix.net/files/base/ebm/iw/static/iw_logo.png?h=60',
      srcset: [
        'https://base.imgix.net/files/base/ebm/iw/static/iw_logo.png?h=120 2x',
      ],
    },
  },
  socialMediaLinks: [
    { provider: 'linkedin', href: 'http://www.linkedin.com/groups/VehicleServicePros.com-4056085/about', target: '_blank' },
    { provider: 'twitter', href: 'http://www.twitter.com/VehicleSrvcPros', target: '_blank' },
    { provider: 'facebook', href: 'http://www.facebook.com/VehicleServicePros', target: '_blank' },
  ],
  gtm: {
    containerId: 'GTM-M7H8VJG',
  },
  wufoo: {
    userName: 'cygnuscorporate',
  },
  magazines: {
    description: '',
  },
};
