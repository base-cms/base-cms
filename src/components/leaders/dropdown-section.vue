<template>
  <section
    :data-dropdown-id="dropdownId"
    :class="classNames"
    :aria-hidden="!isActive"
  >
    <div class="leaders__dropdown-content">
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    dropdownId: {
      type: [String, Number],
      required: true,
    },
    activeDropdownId: {
      type: [String, Number],
      default: null,
    },
  },

  data: () => ({
    elementName: 'dropdown-section',
  }),

  computed: {
    isActive() {
      return `${this.dropdownId}` === `${this.activeDropdownId}`;
    },
    classNames() {
      const elementName = `leaders__${this.elementName}`;
      const classes = [elementName];
      if (this.isActive) classes.push(`${elementName}--active`);
      return classes;
    },
  },
};
</script>
