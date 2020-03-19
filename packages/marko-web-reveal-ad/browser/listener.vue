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
    target: {
      type: String,
      default: '.document-container > .page',
    },
    displayFrequency: {
      type: Number,
      default: 2,
    },
    defaults: {
      type: Object,
      default: () => ({ backgroundColor: 'transparent' }),
    },
    selectAllTargets: {
      type: Boolean,
      default: false,
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
      const {
        adClickUrl,
        backgroundColor,
        backgroundImagePath,
      } = this.payload;

      const backgroundImage = `url("${backgroundImagePath}")`;
      const revealBackground = $('<a>', { href: adClickUrl, target, rel }).addClass('reveal-ad-background').css({ backgroundImage });
      $('body').css({ backgroundColor }).prepend(revealBackground);
      $('body').addClass('with-reveal-ad');
    },
    displayAd(element) {
      if (!element) return;
      const {
        adClickUrl,
        adImagePath,
        adTitle,
        boxShadow,
      } = this.payload;

      const adContainer = $('<div>').addClass('reveal-ad');
      if (boxShadow) adContainer.addClass(`reveal-ad--${boxShadow}-shadow`);
      adContainer.html($('<a>', {
        href: adClickUrl,
        title: adTitle,
        target,
        rel,
      }).append($('<img>', { src: adImagePath, alt: adTitle })));
      $(element).before(adContainer);
    },
    shouldDisplay() {
      const { displayFrequency } = this;
      this.observed += 1;
      return this.observed % displayFrequency > 0;
    },
    observeMutations() {
      if (!window.MutationObserver) return;
      this.observer = new MutationObserver((mutationList) => {
        for (let i = 0; i < mutationList.length; i += 1) {
          const mutation = mutationList[i];
          if (mutation.type === 'childList') {
            for (let x = 0; x < mutation.addedNodes.length; x += 1) {
              const added = mutation.addedNodes[x];
              if (added.matches && added.matches(this.target)) {
                if (this.shouldDisplay()) this.displayAd(added);
              }
            }
          }
        }
      });
      const node = document.querySelector(this.target);
      if (node && node.parentNode) {
        this.observer.observe(node.parentNode, { childList: true, subtree: true });
      }
    },
    listener(event) {
      const payload = parseJson(event.data);
      if (['adImagePath', 'adTitle', 'backgroundImagePath', 'adClickUrl'].every(k => payload[k])) {
        const elements = this.selectAllTargets
          ? document.querySelectorAll(this.target) : [document.querySelector(this.target)];
        document.querySelectorAll(this.target);
        this.payload = { ...this.defaults, ...payload };
        this.displayBackground();
        for (let i = 0; i < elements.length; i += 1) {
          this.displayAd(elements[i]);
        }
        this.observeMutations();
        window.removeEventListener('message', this.listener);
      }
    },
  },
};
</script>
