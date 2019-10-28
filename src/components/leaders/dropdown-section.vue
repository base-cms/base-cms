<template>
  <section
    :data-dropdown-index="index"
    :class="classNames"
    :aria-hidden="hidden"
  >
    <div class="leaders__dropdown-content">
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: true,
    },
    activeIndex: {
      type: Number,
      default: null,
    },
    lastActiveIndex: {
      type: Number,
      default: null,
    },
  },

  data: () => ({
    elementName: 'dropdown-section',
  }),

  computed: {
    hidden() {
      if (this.activeIndex == null) return true;
      return this.activeIndex !== this.index;
    },
    hasLastActiveIndex() {
      return this.lastActiveIndex != null;
    },
    isActive() {
      return this.index === this.lastActiveIndex;
    },
    isBefore() {
      if (!this.hasLastActiveIndex) return null;
      return this.index < this.lastActiveIndex;
    },
    isAfter() {
      if (!this.hasLastActiveIndex) return null;
      return this.index > this.lastActiveIndex;
    },
    classNames() {
      const elementName = `leaders__${this.elementName}`;
      const classes = [elementName];
      if (this.isActive) classes.push(`${elementName}--active`);
      if (this.isBefore) classes.push(`${elementName}--left`);
      if (this.isAfter) classes.push(`${elementName}--right`);
      return classes;
    },
  },
};
</script>

<style lang="scss">
.leaders {
  &__dropdown-section {
    pointer-events: none;
    opacity: 0;
    will-change: transform, opacity;
    transition-duration: .25s;
    transition-property: transform, opacity, -webkit-transform;
    &--active {
      opacity: 1;
      transform: translateX(0);
    }
    &--left {
      transform: translateX(-150px);
    }
    &--right {
      transform: translateX(150px);
    }
  }
}
</style>
