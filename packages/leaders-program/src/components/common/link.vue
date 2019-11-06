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
import { buildFlags } from '../../utils/link-tracking';

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
  },

  methods: {
    emitClick(event) {
      const flags = buildFlags(this.target);
      this.$emit('click', { href: this.href, flags }, event);
    },
  },
};
</script>
