const leaders = require('./leaders');
const navigation = require('./navigation');

module.exports = {
  company: 'Endeavor Business Media, LLC',
  leaders,
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
    { provider: 'linkedin', href: 'http://www.linkedin.com/groups/Laser-Focus-World-2896249', target: '_blank' },
    { provider: 'twitter', href: 'https://twitter.com/LaserFocusWorld', target: '_blank' },
    { provider: 'facebook', href: 'https://www.facebook.com/pages/Laser-Focus-World/126899915297', target: '_blank' },
  ],
  gtm: {
    containerId: 'GTM-MFCT2LV',
  },
  wufoo: {
    userName: 'cygnuscorporate',
  },
  magazines: {
    description: '',
  },
  inquiry: {
    enabled: true,
    directSend: true,
    sendTo: 'bgweb@endeavorb2b.com',
    sendFrom: 'LaserFocusWorld.com <noreply@baseplatform.io>',
    sendBcc: 'emailactivity@cygnus.com',
    logo: 'https://img.laserfocusworld.com/files/base/pennwell/lfw/logo.png?h=60',
    bgColor: '#164f77',
  },
};
