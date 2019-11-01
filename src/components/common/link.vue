<template>
  <a
    :href="href"
    :target="target"
    :rel="rel"
    @click="emitClick"
  >
    <slot />
  </a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      default: null,
    },
  },

  computed: {
    rel() {
      const rels = [];
      if (this.target === '_blank') rels.push('noopener');
      if (/^http/.test(this.href)) rels.push('noreferrer');
      return rels.join(' ');
    },
    willClickUnloadPage() {
      return Boolean(this.target !== '_blank');
    },
    canSendBeacon() {
      return window.navigator && typeof window.navigator.sendBeacon === 'function';
    },
    shouldAwait() {
      return this.willClickUnloadPage && !this.canSendBeacon;
    },
  },

  methods: {
    emitClick(event) {
      event.preventDefault();
      const flags = {
        willClickUnloadPage: this.willClickUnloadPage,
        canSendBeacon: this.canSendBeacon,
        shouldAwait: this.shouldAwait,
      };
      this.$emit('click', { href: this.href, flags }, event);
    },
  },
};
</script>
