<template>
  <form-group>
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      v-model="postalCode"
      class="form-control"
      type="text"
      :disabled="disabled"
      :placeholder="placeholder"
      autocomplete="postal-code"
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
      default: 'Postal/ZIP Code',
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
    id: 'sign-on-postal-code',
  }),
  computed: {
    postalCode: {
      get() {
        return this.value;
      },
      set(postalCode) {
        this.$emit('input', postalCode);
      },
    },
  },
};
</script>
