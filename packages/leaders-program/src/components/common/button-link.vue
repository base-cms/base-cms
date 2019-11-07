<template>
  <common-link
    :class="classes"
    :href="href"
    :target="target"
    @click="emitClick"
  >
    <slot />
  </common-link>
</template>

<script>
import CommonLink from './link.vue';

export default {
  components: { CommonLink },

  props: {
    href: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'primary',
      validator: v => ['primary', 'accent'].includes(v),
    },
    block: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes() {
      const blockName = 'leaders-button-link';
      const classes = [blockName, `${blockName}--${this.type}`];
      if (this.block) classes.push(`${blockName}--block`);
      return classes;
    },
  },

  methods: {
    emitClick(...args) {
      this.$emit('click', ...args);
    },
  },
};
</script>
