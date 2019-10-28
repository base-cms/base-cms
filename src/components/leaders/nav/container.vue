<template>
  <component :is="tag" class="leaders-nav">
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'ul',
    },
  },
};
</script>

<style lang="scss">
.leaders-nav {
  display: flex;
  padding: 0;
  margin: 0;
}
</style>
