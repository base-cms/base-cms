<template>
  <div class="leaders__dropdown">
    <div ref="background" class="leaders__background">
      <div ref="innerBackground" class="leaders__background-alt" />
    </div>
    <div ref="arrow" class="leaders__arrow" />
    <slot />
  </div>
</template>

<script>
export default {
  computed: {
    arrow() {
      return this.$refs.arrow;
    },
    background() {
      return this.$refs.background;
    },
    innerBackground() {
      return this.$refs.innerBackground;
    },
  },
};
</script>
