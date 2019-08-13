
<template>
  <icon-wrapper
    name="triangle-right"
    :modifiers="modifiers"
  >
    <!-- eslint-disable-next-line -->
    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="16" viewBox="0 0 6 16"><path fill-rule="evenodd" d="M0 14l6-6-6-6v12z"/></svg>
  </icon-wrapper>
</template>

<script>
import IconWrapper from './_wrapper.vue';

export default {
  components: { IconWrapper },
  props: {
    modifiers: {
      type: Array,
      default: () => ([]),
    },
  },
};
</script>
