<template>
  <form-group>
    <form-label :for="id" :required="required">
      {{ label }}
    </form-label>
    <textarea
      :id="id"
      v-model="body"
      class="form-control"
      :required="required"
      :disabled="disabled"
      :placeholder="placeholder"
    />
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
      default: 'Your Comment',
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
    id: 'comment-body',
  }),
  computed: {
    body: {
      get() {
        return this.value || '';
      },
      set(body) {
        this.$emit('input', body || null);
      },
    },
  },
};
</script>
