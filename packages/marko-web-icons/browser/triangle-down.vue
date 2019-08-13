
<template>
  <icon-wrapper
    name="triangle-down"
    :modifiers="modifiers"
  >
    <!-- eslint-disable-next-line -->
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16"><path fill-rule="evenodd" d="M0 5l6 6 6-6H0z"/></svg>
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
