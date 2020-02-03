<template>
  <pswp-button
    :modifiers="['share']"
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
      default: 'Share',
    },
  },
};
</script>
