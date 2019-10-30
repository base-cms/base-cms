<template>
  <span class="leaders-nav-link-contents">
    <filter-none-icon />
    <span class="leaders-nav-link-contents__title">
      {{ title }}
    </span>
  </span>
</template>


<script>
import FilterNoneIcon from './icons/filter-none.vue';

export default {
  components: { FilterNoneIcon },

  props: {
    title: {
      type: String,
      default: null,
    },
  },
};
</script>
