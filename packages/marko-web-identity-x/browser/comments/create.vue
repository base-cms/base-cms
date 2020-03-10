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
    body: '',
  }),

  /**
   *
   */
  methods: {
    /**
     *
     */
    handleSubmit() {

    },
  },
};
</script>
