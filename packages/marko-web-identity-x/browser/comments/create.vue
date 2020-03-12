<template>
  <form :class="blockName" @submit.prevent="handleSubmit">
    <fieldset :disabled="isLoading">
      <display-name v-model="displayName" label="Posting As" />
      <comment-body v-model="body" />
      <button
        type="submit"
        class="btn btn-primary"
      >
        Submit
      </button>
    </fieldset>
  </form>
</template>

<script>
import post from '../utils/post';
import FormError from '../errors/form';
import DisplayName from '../form/fields/display-name.vue';
import CommentBody from '../form/fields/comment-body.vue';

export default {
  /**
   *
   */
  components: { DisplayName, CommentBody },

  /**
   *
   */
  props: {
    stream: {
      type: Object,
      required: true,
    },

    displayName: {
      type: String,
      required: true,
    },
  },

  /**
   *
   */
  data: () => ({
    blockName: 'idx-create-comment',
    isLoading: false,
    error: null,
    body: '',
  }),

  /**
   *
   */
  methods: {
    /**
     *
     */
    async handleSubmit() {
      this.error = null;
      this.isLoading = true;
      const { displayName, body, stream } = this;
      try {
        const res = await post('/comment', {
          displayName,
          body,
          stream,
        });
        const data = await res.json();
        if (!res.ok) throw new FormError(data.message, res.status);
        this.body = '';
        this.$emit('complete');
      } catch (e) {
        this.error = e;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
