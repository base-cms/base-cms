<template>
  <div class="col">
    <slot />
  </div>
</template>

<style lang="scss">
@import "../../scss/variables";

.col {
  position: relative;
  width: 100%;
  padding-right: $grid-gutter-width / 2;
  padding-left: $grid-gutter-width / 2;
}
</style>
