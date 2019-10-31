<template>
  <div v-if="canDisplay" class="leaders-content-deck">
    <div class="leaders-content-deck__header">
      <div class="leaders-content-deck__header-left">
        <slot name="header-left" />
      </div>
      <div class="leaders-content-deck__header-left">
        <slot name="header-right" />
      </div>
    </div>
    <div
      v-for="(item, index) in limitedValue"
      :key="index"
      class="leaders-content-deck__item"
    >
      <slot :item="item" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    limit: {
      type: Number,
      default: 4,
    },
  },

  computed: {
    canDisplay() {
      return Boolean(this.value.length);
    },
    limitedValue() {
      return this.value.slice(0, this.limit);
    },
  },
};
</script>
