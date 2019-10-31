<template>
  <a
    :href="href"
    :target="target"
    :rel="rel"
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
  },
};
</script>
