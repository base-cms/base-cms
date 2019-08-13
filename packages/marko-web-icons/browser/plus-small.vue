
<template>
  <icon-wrapper
    name="plus-small"
    :modifiers="modifiers"
  >
    <!-- eslint-disable-next-line -->
    <svg xmlns="http://www.w3.org/2000/svg" width="7" height="16" viewBox="0 0 7 16"><path fill-rule="evenodd" d="M4 4H3v3H0v1h3v3h1V8h3V7H4V4z"/></svg>
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
