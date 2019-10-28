<template>
  <component :is="tag" class="leaders__nav-item">
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'li',
    },
  },
};
</script>

<style lang="scss">
.leaders {
  &__nav-item  {
    list-style: none;
  }
}
</style>
