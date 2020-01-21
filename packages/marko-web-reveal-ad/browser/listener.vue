<template>
  <div id="marko-web-reveal-ad-listener" />
</template>

<script>
import $ from '@base-cms/marko-web/browser/jquery';

const parseJson = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return {};
  }
};

const target = '_blank';
const rel = 'noopener noreferrer';

export default {
  props: {
    containerClass: {
      type: String,
      default: 'document-container',
    },
    targetClass: {
      type: String,
      default: 'page',
    },
    displayFrequency: {
      type: Number,
      default: 2,
    },
    defaults: {
      type: Object,
      default: () => ({ backgroundColor: 'transparent' }),
    },
  },
  data: () => ({
    observed: 0,
    observer: null,
    payload: {},
  }),
  created() {
    window.addEventListener('message', this.listener);
  },
  beforeDestroy() {
    window.removeEventListener('message', this.listener);
    if (this.observer) this.observer.disconnect();
  },
  methods: {
    displayBackground() {
      const { adClickUrl: href, backgroundColor, backgroundImagePath } = this.payload;

      const backgroundImage = `url("${backgroundImagePath}")`;
      const adContainer = $('<div>').addClass('reveal-ad');
      if (this.payload.boxShadow) adContainer.addClass(`reveal-ad--${this.payload.boxShadow}-shadow`);

      const revealBackground = $('<a>', { href, target, rel }).addClass('reveal-ad-background').css({ backgroundImage });
      $('body').css({ backgroundColor }).prepend(revealBackground);
    },
    displayAd(element) {
      const { adClickUrl: href, adImagePath: src, adTitle: alt } = this.payload;

      const adContainer = $('<div>').addClass('reveal-ad');
      if (this.payload.boxShadow) adContainer.addClass(`reveal-ad--${this.payload.boxShadow}-shadow`);
      adContainer.html($('<a>', {
        href,
        title: alt,
        target,
        rel,
      }).append($('<img>', { src, alt })));
      $(element).before(adContainer);
    },
    shouldDisplay() {
      const { displayFrequency, observed } = this;
      this.observed = observed + 1;
      return this.observed % displayFrequency > 0;
    },
    observeMutations() {
      this.observer = new MutationObserver((list) => {
        // Use traditional 'for loops' for IE 11
        // eslint-disable-next-line no-restricted-syntax, prefer-const
        for (let mutation of list) {
          if (mutation.type === 'childList') {
            // eslint-disable-next-line no-restricted-syntax, prefer-const
            for (let added of mutation.addedNodes) {
              if (added.classList && added.classList.contains(this.targetClass)) {
                if (this.shouldDisplay()) this.displayAd(added);
              }
            }
          }
        }
      });
      const node = document.getElementsByClassName(this.containerClass)[0];
      this.observer.observe(node, { childList: true });
    },
    listener(event) {
      const payload = parseJson(event.data);
      const element = $(`.${this.containerClass} .${this.targetClass}`);
      if (['adImagePath', 'adTitle', 'backgroundImagePath', 'adClickUrl'].every(k => payload[k])) {
        this.payload = { ...this.defaults, ...payload };
        this.displayBackground();
        this.displayAd(element);
        this.observeMutations();
        window.removeEventListener('message', this.listener);
      }
    },
  },
};
</script>
