<template>
  <form-group>
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      v-model="familyName"
      class="form-control"
      type="text"
      :required="true"
      :disabled="disabled"
      :placeholder="placeholder"
      autocomplete="family-name"
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
      default: 'Last Name',
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
    id: 'sign-on-family-name',
  }),
  computed: {
    familyName: {
      get() {
        return this.value;
      },
      set(familyName) {
        this.$emit('input', familyName);
      },
    },
  },
};
</script>
