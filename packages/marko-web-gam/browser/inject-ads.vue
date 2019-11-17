<template>
  <div :id="elementId" style="display: none;" />
</template>

<script>
import $ from '@base-cms/marko-web/browser/jquery';

export default {
  props: {
    selector: {
      type: String,
      required: true,
    },
    childSelector: {
      type: String,
      default: 'p',
    },
    toInject: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    hasInjected: {},
  }),

  computed: {
    elementId() {
      return `marko-web-gam-inject-ads-${Date.now()}`;
    },
    targetLengths() {
      return Object.keys(this.toInject).map(n => parseInt(n, 10)).filter(n => n && n >= 1);
    },
  },

  mounted() {
    let totalLength = 0;
    const { childSelector } = this;
    const component = this;
    const $el = $(this.selector);
    const $children = $(`> ${childSelector}`, $el);

    $children.each(function injectAds(index) {
      const $child = $(this);
      const { length } = $child.text();
      const $nextChild = $(this).next(childSelector);

      component.targetLengths.forEach((targetLength) => {
        if (component.canInject({
          targetLength,
          totalLength,
          childLength: length,
          childIndex: index,
          childrenLength: $children.length,
        })) {
          const contents = component.toInject[targetLength];
          if (contents) {
            // Unescape closing HTML tags.
            const cleaned = contents.replace(/<\\\/(.+?)>/g, '</$1>');
            if ($nextChild.text().length <= 1) {
              // eslint-disable-next-line consistent-return
              $child.nextAll(childSelector).each(function handleBefore() {
                if ($(this).text().length > 1) {
                  $(this).before(cleaned);
                  return false;
                }
              });
            } else {
              $child.after(cleaned);
            }
          }
          component.hasInjected[targetLength] = true;
        }
      });
      totalLength += length;
    });
  },

  methods: {
    canInject({
      targetLength,
      totalLength,
      childLength,
      childIndex,
      childrenLength,
    } = {}) {
      const hasInjected = this.hasInjected[targetLength];
      if (hasInjected || !targetLength) return false;
      return totalLength <= targetLength
        && totalLength + childLength >= targetLength
        && childIndex + 1 !== childrenLength;
    },
  },
};
</script>
