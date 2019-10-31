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
        class="leaders-content-deck__item"
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

<style lang="scss">
@import "../../../scss/variables";

.leaders-content-deck {
  &__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: $leaders-card-body-padding / 2;
    font-size: 14px;
  }

  &__header-left {
    font-weight: 800;
  }

  &__body {
    display: flex;
    flex-direction: row;
  }

  &__item {
    padding-right: $leaders-card-body-padding / 2;
    padding-left: $leaders-card-body-padding / 2;

    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
    }
  }

  a {
    color: $leaders-card-body-color;
    &:hover {
      color: $leaders-card-body-color;
    }
  }

}
</style>
