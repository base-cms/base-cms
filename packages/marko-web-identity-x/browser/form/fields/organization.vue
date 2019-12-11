<template>
  <form-group>
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      v-model="organization"
      class="form-control"
      type="text"
      :disabled="disabled"
      :placeholder="placeholder"
      autocomplete="organization"
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
      default: 'Company Name',
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
    id: 'sign-on-organization',
  }),
  computed: {
    organization: {
      get() {
        return this.value;
      },
      set(organization) {
        this.$emit('input', organization);
      },
    },
  },
};
</script>
