const navigation = require('./navigation');

module.exports = {
  navigation,
  company: 'PMMI Media Group',
  logos: {
    navbar: {
      src: 'https://img.automationworld.com/files/base/pmmi/aw/aw_logo.png?h=45',
      srcset: [
        'https://img.automationworld.com/files/base/pmmi/aw/aw_logo.png?h=90 2x',
      ],
    },
    footer: {
      src: 'https://img.automationworld.com/files/base/pmmi/aw/aw_logo.png?h=60',
      srcset: [
        'https://img.automationworld.com/files/base/pmmi/aw/aw_logo.png?h=120 2x',
      ],
    },
  },
  socialMediaLinks: [
    { provider: 'facebook', href: 'https://www.facebook.com/AutomationWorldMag' },
    { provider: 'twitter', href: 'https://www.twitter.com/automationworld' },
    { provider: 'linkedin', href: 'https://www.linkedin.com/showcase/automation-world' },
    { provider: 'instagram', href: 'https://www.instagram.com/automation_world' },
  ],
  gtm: {
    containerId: 'GTM-NM2MBTG',
    slotPrefix: 'aw',
  },
  leaders: {
    title: 'Leadership in Automation',
    alias: 'leaders',
    header: {
      imgSrc: 'https://img.automationworld.com/files/base/pmmi/all/leaders/aw.png',
    },
  },
};
