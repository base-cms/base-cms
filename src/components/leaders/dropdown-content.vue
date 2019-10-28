<template>
  <div class="leaders__dropdown-content">
    <slot />
  </div>
</template>

<style lang="scss">
.leaders {
  &__dropdown-content {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
