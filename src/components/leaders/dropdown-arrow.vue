<template>
  <div class="leaders-dropdown__arrow" :style="styles" />
</template>

<script>
export default {
  props: {
    styles: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss">
.leaders-dropdown {
  &__arrow {
    position: absolute;
    top: -6px;
    left: 0;
    width: 12px;
    height: 12px;
    margin: 0 0 0 -6px;
    background: #fff;
    border-radius: 4px 0 0;
    box-shadow: -3px -3px 5px rgba(82, 95, 127, .04);
    transition-duration: .25s;
    transition-property: transform, -webkit-transform;
    transform: rotate(45deg);
    will-change: transform;
  }
}
</style>
