<template>
  <div :id="elementId" />
</template>

<script>
import $ from '@base-cms/marko-web/browser/jquery';
import elementId from '@base-cms/marko-web/browser/components/element-id';

const parseJson = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return {};
  }
};

export default {
  props: {
    target: {
      type: String,
      default: '.document-container .page',
    },
    defaults: {
      type: Object,
      default: () => ({ backgroundColor: 'transparent' }),
    },
  },
  computed: {
    elementId() {
      return elementId('reveal-ad-listener');
    },
  },
  created() {
    window.addEventListener('message', this.listener);
  },
  beforeDestroy() {
    window.removeEventListener('message', this.listener);
  },
  methods: {
    display(payload) {
      const options = { ...this.defaults, ...payload };
      const { adClickUrl: href, backgroundColor, backgroundImagePath } = options;
      const { adImagePath: src, adTitle: alt } = options;
      const backgroundImage = `url("${backgroundImagePath}")`;

      const title = alt;
      const target = '_blank';
      const rel = 'noopener noreferrer';

      const adContainer = $('<div>').addClass('reveal-ad');
      if (options.boxShadow) adContainer.addClass(`reveal-ad--${options.boxShadow}-shadow`);
      adContainer.html($('<a>', {
        href,
        title,
        target,
        rel,
      }).append($('<img>', { src, alt })));

      const revealBackground = $('<a>', { href, target, rel }).addClass('reveal-ad-background').css({ backgroundImage });
      $('body').css({ backgroundColor }).prepend(revealBackground);
      $(this.target).before(adContainer);
    },
    listener(event) {
      const payload = parseJson(event.data);
      if (['adImagePath', 'adTitle', 'backgroundImagePath', 'adClickUrl'].every(k => payload[k])) {
        this.display(payload);
        window.removeEventListener('message', this.listener);
      }
    },
  },
};
</script>
