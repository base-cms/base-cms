<template>
  <div class="leaders-dropdown__content">
    <slot />
  </div>
</template>

<style lang="scss">
.leaders-dropdown {
  &__content {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
