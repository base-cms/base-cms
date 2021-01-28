<template>
  <div>
    <div
      v-for="option in options"
      :key="option.id"
      class="custom-control custom-checkbox"
    >
      <input
        :id="createId(option.id)"
        v-model="checked"
        :required="isRequired"
        :value="option.id"
        type="checkbox"
        class="custom-control-input"
      >
      <label
        :for="createId(option.id)"
        class="custom-control-label"
      >
        {{ option.label }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * The wrapping field group identifier.
     */
    groupId: {
      type: String,
      required: true,
    },

    /**
     * Whether the checkbox group is required.
     */
    required: {
      type: Boolean,
      default: false,
    },

    /**
     * An array of option objects:
     * [
     *   { id: 'some-id', label: 'Some label' },
     * ]
     */
    options: {
      type: Array,
      default: () => [],
    },

    /**
     * An array of selected option IDs.
     * ['some-id']
     */
    selected: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      /**
       * Clone the selected value to the checked array.
       * This is used internally as the `v-model` for the checkboxes.
       * The value is then watched to emit the change event.
       */
      checked: [...this.selected],
    };
  },

  computed: {
    /**
     * Determines if the checkboxes are required from a
     * validation perspective. Because HTML5 doesn't support
     * checkbox groups out-of-the-box, this will make all the boxes
     * required when none are checked, but optional when at least one
     * is checked.
     *
     * This only applies when the overall group `required` prop is set to true.
     */
    isRequired() {
      if (!this.required) return false;
      if (this.selected.length) return false;
      return true;
    },
  },

  watch: {
    /**
     * Emit the selected option IDs when the checked array changes.
     */
    checked(ids) {
      this.$emit('change', ids);
    },
  },

  methods: {
    createId(optionId) {
      return `checkbox-${this.groupId}-${optionId}`;
    },
  },
};
</script>
