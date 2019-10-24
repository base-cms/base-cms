<template>
  <div class="container">
    <slot />
  </div>
</template>

<style lang="scss">
@import "../../scss/variables";

.container {
  width: 100%;
  padding-right: $grid-gutter-width / 2;
  padding-left: $grid-gutter-width / 2;
  margin-right: auto;
  margin-left: auto;
}
</style>
