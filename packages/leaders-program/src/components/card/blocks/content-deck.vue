<template>
  <div v-if="canDisplay" class="leaders-content-deck">
    <div class="leaders-content-deck__header">
      <div class="leaders-content-deck__header-left">
        <slot name="header-left" />
      </div>
      <div class="leaders-content-deck__header-right">
        <slot name="header-right" />
      </div>
    </div>
    <div class="leaders-content-deck__body">
      <div
        v-for="(item, index) in limitedValue"
        :key="index"
        :class="itemClasses"
      >
        <slot :item="item" />
      </div>
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
    itemModifiers: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    canDisplay() {
      return Boolean(this.value.length);
    },
    limitedValue() {
      return this.value.slice(0, this.limit);
    },
    itemClasses() {
      const elementName = 'leaders-content-deck__item';
      return [
        elementName,
        ...this.itemModifiers.map(mod => `${elementName}--${mod}`),
      ];
    },
  },
};
</script>
