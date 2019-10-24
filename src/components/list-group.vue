<template>
  <ul class="leaders-list-group">
    <li v-for="(item, index) in items" :key="index" class="leaders-list-group__item">
      <slot v-bind="item" />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
