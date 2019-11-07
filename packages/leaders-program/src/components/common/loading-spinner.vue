<template>
  <div :class="classes" role="status">
    <span class="leaders-loading-spinner__message">{{ message }}</span>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: 'Loading...',
    },
    modifiers: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    classes() {
      const blockName = 'leaders-loading-spinner';
      return [
        blockName,
        ...this.modifiers.map(mod => `${blockName}--${mod}`),
      ];
    },
  },
};
</script>
