<template>
  <form-group>
    <div class="custom-control custom-checkbox">
      <input
        :id="`policy-${id}`"
        v-model="given"
        :disabled="disabled"
        :required="required"
        type="checkbox"
        class="custom-control-input"
      >
      <form-label class="custom-control-label" :for="`policy-${id}`" :required="required">
        <span v-html="message" />
      </form-label>
    </div>
  </form-group>
</template>

<script>
import FormGroup from '../common/form-group.vue';
import FormLabel from '../common/form-label.vue';

export default {
  components: { FormGroup, FormLabel },
  props: {
    id: {
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
    required: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      required: true,
    },
  },
  computed: {
    given: {
      get() {
        return this.value;
      },
      set(given) {
        this.$emit('input', given);
      },
    },
  },
};
</script>
