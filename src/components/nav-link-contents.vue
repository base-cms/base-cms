<template>
  <span class="leaders-nav-link-contents">
    <span class="leaders-nav-link-contents__title">
      {{ title }}
    </span>
  </span>
</template>


<script>
export default {
  props: {
    title: {
      type: String,
      default: null,
    },
  },
};
</script>
