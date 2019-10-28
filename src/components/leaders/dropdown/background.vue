<template>
  <div class="leaders-dropdown__background" :style="styles">
    <div class="leaders-dropdown__inner-background" :style="innerStyles" />
  </div>
</template>

<script>
export default {
  props: {
    styles: {
      type: Object,
      default: () => ({}),
    },
    innerStyles: {
      type: Object,
      default: () => ({}),
    },
  },
};
/* eslint-disable */
</script>

<style lang="scss">
.leaders-dropdown {
  &__background {
    width: 380px;
    height: 400px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 50px 100px -20px rgba(50, 50, 93, .25), 0 30px 60px -30px rgba(0, 0, 0, .3), 0 -18px 60px -10px rgba(0, 0, 0, .025);
    transform: translateX(0);
    transform-origin: 0 0;
  }

  &__inner-background {
    right: 0;
    height: 1000px;
    background: #f6f9fc;
  }

  &__background,
  &__inner-background {
    position: absolute;
    top: 0;
    left: 0;
    will-change: transform;
    transition-duration: .25s;
    transition-property: transform, -webkit-transform;
  }
}
</style>
