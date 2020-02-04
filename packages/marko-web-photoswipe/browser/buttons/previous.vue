<template>
  <pswp-button
    :modifiers="['arrow--left']"
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
      default: 'Previous (Left Arrow)',
    },
  },
};
</script>
