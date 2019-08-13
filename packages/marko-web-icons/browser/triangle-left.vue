
<template>
  <icon-wrapper
    name="triangle-left"
    :modifiers="modifiers"
  >
    <!-- eslint-disable-next-line -->
    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="16" viewBox="0 0 6 16"><path fill-rule="evenodd" d="M6 2L0 8l6 6V2z"/></svg>
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
