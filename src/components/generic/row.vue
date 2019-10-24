<template>
  <div class="row">
    <slot />
  </div>
</template>

<style lang="scss">
@import "../../scss/variables";

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -$grid-gutter-width / 2;
  margin-left: -$grid-gutter-width / 2;
}
</style>
