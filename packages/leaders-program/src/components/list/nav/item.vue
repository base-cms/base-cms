<template>
  <component :is="tag" class="leaders-nav__item">
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
