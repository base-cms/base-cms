<template>
  <form-group>
    <div class="custom-control custom-checkbox">
      <input
        :id="id"
        v-model="receiveEmail"
        :disabled="disabled"
        type="checkbox"
        class="custom-control-input"
      >
      <label :for="id" class="custom-control-label">
        {{ emailConsentRequest }}
      </label>
    </div>
  </form-group>
</template>

<script>
import FormGroup from '../common/form-group.vue';

export default {
  components: { FormGroup },
  props: {
    emailConsentRequest: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    id: 'sign-on-receive-email',
  }),
  computed: {
    receiveEmail: {
      get() {
        return this.value;
      },
      set(receiveEmail) {
        this.$emit('input', receiveEmail);
      },
    },
  },
};
</script>
