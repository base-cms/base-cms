<template>
  <component :is="tag" class="leaders-list__navbar">
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'nav',
    },
  },
};
</script>
