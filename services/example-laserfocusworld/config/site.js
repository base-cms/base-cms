const navigation = require('./navigation');

module.exports = {
  company: 'Endeavor Business Media, LLC',
  navigation,
  logos: {
    navbar: {
      src: 'https://base.imgix.net/files/base/pennwell/lfw/logo.png?h=45',
      srcset: [
        'https://base.imgix.net/files/base/pennwell/lfw/logo.png?h=90 2x',
      ],
    },
    footer: {
      src: 'https://base.imgix.net/files/base/pennwell/lfw/logo.png?h=60',
      srcset: [
        'https://base.imgix.net/files/base/pennwell/lfw/logo.png?h=120 2x',
      ],
    },
  },
  socialMediaLinks: [
    { provider: 'linkedin', href: 'http://www.linkedin.com/groups/Laser-Focus-World-2896249' },
    { provider: 'twitter', href: 'https://twitter.com/LaserFocusWorld' },
    { provider: 'facebook', href: 'https://www.facebook.com/pages/Laser-Focus-World/126899915297' },
  ],
  gtm: {
    containerId: 'GTM-M7H8VJG',
  },
};
