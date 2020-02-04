<template>
  <pswp-button
    :modifiers="['arrow--right']"
    :title="title"
  />
</template>

<script>
import PswpButton from '../button.vue';

export default {
  components: { PswpButton },
  props: {
    title: {
      type: String,
      default: 'Next (Right Arrow)',
    },
  },
};
</script>
