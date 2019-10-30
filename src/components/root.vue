<template>
  <div class="leaders-root">
    <slot />
  </div>
</template>

<style lang="scss">
@import "../scss/variables";
@import "../scss/mixins";

.leaders-root {
  @include leaders-base();
}
</style>
