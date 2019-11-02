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

<style lang="scss">
@import "../../scss/variables";

@keyframes leaders-spinner-grow {
  0% {
    transform: scale(0);
  }
  50% {
    opacity: 1;
  }
}

.leaders-loading-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  color: $leaders-primary-color;
  vertical-align: text-bottom;
  background-color: currentColor;
  border-radius: 50%;
  opacity: 0;
  animation: leaders-spinner-grow .75s linear infinite;

  &__message {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
}

</style>
