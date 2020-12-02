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
  radix: {
    enabled: true,
    appId: '97b09a4b-8eb8-475f-b72f-19d0f2073256', // vspc value
    submissionFieldIds: [
      { name: 'comments', id: '57e55318bcf2d6f3c30e0833' }, // vspc value
    ],
    url: 'https://radix.laserfocusworld.com',
  },
  inquiry: {
    enabled: true,
    directSend: true,
    sendTo: 'bgweb@endeavorb2b.com',
    sendFrom: 'LaserFocusWorld.com <noreply@baseplatform.io>',
    sendBcc: 'emailactivity@cygnus.com',
    logo: 'https://img.laserfocusworld.com/files/base/pennwell/lfw/logo.png?h=60',
    bgColor: '#164f77',
    gdprMessage: "Yes, Endeavor Business Media may use my contact information consistent with Endeavor's Privacy Policy to communicate with me by email or telephone about other offerings by Endeavor, its brands, affiliates and/or third-party partners that may be of interest to businesses and individual participants in my industry.",
    privacyMessage: "By clicking above, I acknowledge and agree to Endeavor Business Media’s Terms of Service and to Endeavor Business Media's use of my contact information to communicate with me about offerings by Endeavor, its brands, affiliates and/or third-party partners, consistent with Endeavor's Privacy Policy. In addition, I understand that my personal information will be shared with any sponsor(s) of the resource, so they can contact me directly about their products or services. Please refer to the privacy policies of such sponsor(s) for more details on how your information will be used by them. You may unsubscribe at any time.",
  },
};
