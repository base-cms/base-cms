<template>
  <form-group>
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      v-model="email"
      class="form-control"
      type="email"
      :required="true"
      :disabled="disabled"
      :placeholder="placeholder"
      autocomplete="email"
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
      default: 'Email Address',
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
    id: 'sign-on-email',
  }),
  computed: {
    email: {
      get() {
        return this.value;
      },
      set(email) {
        this.$emit('input', email);
      },
    },
  },
};
</script>
