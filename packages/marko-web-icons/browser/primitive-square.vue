
<template>
  <icon-wrapper
    name="primitive-square"
    :modifiers="modifiers"
  >
    <!-- eslint-disable-next-line -->
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="16" viewBox="0 0 8 16"><path fill-rule="evenodd" d="M8 12H0V4h8v8z"/></svg>
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
