
<template>
  <icon-wrapper
    name="arrow-right"
    :modifiers="modifiers"
  >
    <!-- eslint-disable-next-line -->
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16"><path fill-rule="evenodd" d="M10 8L4 3v3H0v4h4v3l6-5z"/></svg>
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
