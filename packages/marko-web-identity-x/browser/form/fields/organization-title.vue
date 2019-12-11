<template>
  <form-group>
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      v-model="organizationTitle"
      class="form-control"
      type="text"
      :disabled="disabled"
      :placeholder="placeholder"
      autocomplete="organization-title"
    >
  </form-group>
</template>

<script>
import FormGroup from '../common/form-group.vue';

export default {
  components: {
    FormGroup,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: 'Job Title',
    },
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    id: 'sign-on-organization-title',
  }),
  computed: {
    organizationTitle: {
      get() {
        return this.value;
      },
      set(organizationTitle) {
        this.$emit('input', organizationTitle);
      },
    },
  },
};
</script>
