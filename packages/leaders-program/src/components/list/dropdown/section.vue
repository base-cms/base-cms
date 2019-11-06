<template>
  <section
    :data-dropdown-index="index"
    :class="classNames"
    :aria-hidden="hidden"
  >
    <dropdown-content ref="content">
      <slot :is-active="isActive" />
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
