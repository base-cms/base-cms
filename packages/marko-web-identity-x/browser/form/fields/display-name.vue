<template>
  <form-group>
    <form-label :for="id" :required="required">
      {{ label }}
    </form-label>
    <input
      :id="id"
      v-model="displayName"
      class="form-control"
      type="text"
      :required="required"
      :disabled="disabled"
      :placeholder="placeholder"
      autocomplete="nickname"
    >
  </form-group>
</template>

<script>
import FormGroup from '../common/form-group.vue';
import FormLabel from '../common/form-label.vue';

export default {
  components: {
    FormGroup,
    FormLabel,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      default: 'Display Name',
    },
    placeholder: {
      type: String,
      default: 'Will be displayed when posting comments.',
    },
    value: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    id: 'sign-on-display-name',
  }),
  computed: {
    displayName: {
      get() {
        return this.value || '';
      },
      set(displayName) {
        this.$emit('input', displayName || null);
      },
    },
  },
};
</script>
