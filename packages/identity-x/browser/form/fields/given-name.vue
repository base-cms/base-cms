<template>
  <form-group>
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      v-model="givenName"
      class="form-control"
      type="text"
      :required="true"
      :disabled="disabled"
      :placeholder="placeholder"
      autocomplete="given-name"
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
      default: 'First Name',
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
    id: 'sign-on-given-name',
  }),
  computed: {
    givenName: {
      get() {
        return this.value;
      },
      set(givenName) {
        this.$emit('input', givenName);
      },
    },
  },
};
</script>
