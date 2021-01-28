<template>
  <form-group>
    <form-label :for="fieldId" :required="required">
      {{ label }}
    </form-label>
    <checkbox-group
      v-if="multiple"
      :group-id="id"
      :options="options"
      :selected="selectedOptionIds"
      :required="required"
      @change="$emit('change', $event)"
    />
    <select
      v-else
      :id="fieldId"
      class="custom-select"
      :required="required"
      @change="$emit('change', [$event.target.value])"
    >
      <option value="">
        Please select...
      </option>
      <option
        v-for="option in options"
        :key="option.id"
        :value="option.id"
        :selected="option.id === selectedOptionId"
      >
        {{ option.label }}
      </option>
    </select>
  </form-group>
</template>

<script>
import CheckboxGroup from '../common/checkbox-group.vue';
import FormGroup from '../common/form-group.vue';
import FormLabel from '../common/form-label.vue';

export default {
  components: {
    CheckboxGroup,
    FormGroup,
    FormLabel,
  },

  props: {
    /**
     * The unique field id.
     */
    id: {
      type: String,
      required: true,
    },

    /**
     * The field display label.
     */
    label: {
      type: String,
      required: true,
    },

    /**
     * Whether the field is required.
     */
    required: {
      type: Boolean,
      default: false,
    },

    /**
     * Whether the custom question supports multiple answers.
     */
    multiple: {
      type: Boolean,
      default: false,
    },

    /**
     * The field options (the possible answers).
     */
    options: {
      type: Array,
      default: () => [],
    },

    /**
     * Since all custom select answers are arrays mimic this behavior.
     */
    selected: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    fieldId() {
      return `custom-select-${this.id}`;
    },

    selectedOptionIds() {
      return this.selected.map(item => item.id);
    },

    selectedOptionId() {
      const { selectedOptionIds, multiple } = this;
      if (!multiple) return selectedOptionIds[0] || '';
      return selectedOptionIds.slice();
    },
  },
};
</script>
