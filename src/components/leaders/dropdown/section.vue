<template>
  <section
    :data-dropdown-index="index"
    :class="classNames"
    :aria-hidden="hidden"
  >
    <dropdown-content ref="content">
      <slot />
    </dropdown-content>
  </section>
</template>

<script>
import DropdownContent from './content.vue';

export default {
  components: { DropdownContent },

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

  computed: {
    content() {
      return this.$refs.content;
    },
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
      const elementName = 'leaders-dropdown__section';
      const classes = [elementName];
      if (this.isActive) classes.push(`${elementName}--active`);
      if (this.isBefore) classes.push(`${elementName}--before`);
      if (this.isAfter) classes.push(`${elementName}--after`);
      return classes;
    },
  },
};
</script>

<style lang="scss">
.leaders-dropdown {
  $self: &;

  &__section {
    pointer-events: none;
    opacity: 0;
    will-change: transform, opacity;
    transition-duration: .25s;
    transition-property: transform, opacity, -webkit-transform;
    &--active {
      opacity: 1;
      transform: translateX(0);
    }
  }

  &--horizontal {
    #{ $self } {
      &__section {
        &--before { // From the left
          transform: translateX(-150px);
        }
        &--after { // From the right
          transform: translateX(150px);
        }
      }
    }
  }

  &--vertical {
    #{ $self } {
      &__section {
        &--before { // From the top
          transform: translateY(-150px);
        }
        &--after { // From the bottom
          transform: translateY(150px);
        }
      }
    }
  }
}
</style>
