<template>
  <span class="leaders-nav-link-contents">
    <filter-none-icon />
    <span class="leaders-nav-link-contents__container">
      <span class="leaders-nav-link-contents__title">{{ title }}</span>
      <videocam-icon />
    </span>
  </span>
</template>


<script>
import FilterNoneIcon from './icons/filter-none.vue';
import VideocamIcon from './icons/videocam.vue';

export default {
  components: { FilterNoneIcon, VideocamIcon },

  props: {
    title: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss">
  .leaders-nav-link-contents {
    display: inline-flex;
    flex-direction: row;
  }
</style>
