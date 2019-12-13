export default {
  facebook: {
    name: 'Facebook',
    href: 'https://www.facebook.com/sharer/sharer.php',
    params: {
      u: '@url',
      title: '@title',
      description: '@description',
    },
    type: 'popup',
  },
  linkedin: {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/shareArticle',
    params: {
      mini: true,
      url: '@url',
      title: '@title',
      summary: '@description',
    },
    type: 'popup',
  },
  twitter: {
    name: 'Twitter',
    href: 'https://twitter.com/intent/tweet',
    params: {
      url: '@url',
      text: '@title',
    },
    type: 'popup',
  },
  pinterest: {
    name: 'Pinterest',
    href: 'https://pinterest.com/pin/create/button/',
    params: {
      url: '@url',
      media: '@media',
      description: '@title',
    },
    type: 'popup',
  },
};
