<template>
  <div class="leaders-dropdown__content">
    <slot />
  </div>
</template>

<style lang="scss">
@import "../../../scss/variables";

.leaders-dropdown {
  $dropdown: &;

  &__content {
    position: absolute;
    top: 0;
    left: 0;
    padding-right: $leaders-dropdown-background-border-size;
  }

  &--open-below {
    #{ $dropdown } {
      &__content {
        padding-top: $leaders-dropdown-background-border-size;
      }
    }
  }

  &--open-above {
    #{ $dropdown } {
      &__content {
        padding-bottom: $leaders-dropdown-background-border-size;
      }
    }
  }

  &--open-left {
    #{ $dropdown } {
      &__content {
        padding-right: $leaders-dropdown-background-border-size;
      }
    }
  }

  &--open-right {
    #{ $dropdown } {
      &__content {
        padding-left: $leaders-dropdown-background-border-size;
      }
    }
  }
}
</style>
