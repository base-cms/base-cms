export default {
  email: {
    name: 'Email',
    href: 'mailto:?subject=@title&body=@url%0D%0A%0D%0A@description',
    action: 'Email',
    params: {
      url: '@url',
      title: '@title',
      description: '@description',
    },
    type: 'direct',
  },
  print: {
    name: 'Print',
    href: '',
    action: 'Print',
    params: {},
    type: 'print',
  },
  facebook: {
    name: 'Facebook',
    href: 'https://www.facebook.com/sharer/sharer.php',
    action: 'Share',
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
    action: 'Share',
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
    action: 'Tweet',
    params: {
      url: '@url',
      text: '@title',
    },
    type: 'popup',
  },
  pinterest: {
    name: 'Pinterest',
    href: 'https://pinterest.com/pin/create/button/',
    action: 'Pin',
    params: {
      url: '@url',
      media: '@media',
      description: '@title',
    },
    type: 'popup',
  },
};
