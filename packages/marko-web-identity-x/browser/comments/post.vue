<template>
  <div :class="blockName" :data-id="id">
    <div :class="element('header')">
      <div :class="element('display-name')">
        <span>Posted by {{ displayName }}</span>
        <span v-if="!approved">(pending moderation)</span>
      </div>
      <div :class="element('created-at')">
        {{ postedAt }}
      </div>
    </div>
    <div :class="element('body')">
      {{ body }}
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  /**
   *
   */
  props: {
    id: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Number,
      required: true,
    },
    approved: {
      type: Boolean,
      default: true,
    },
    dateFormat: {
      type: String,
      default: 'MMM Do, YYYY h:mma',
    },
  },

  /**
   *
   */
  data: () => ({
    blockName: 'idx-comment-post',
  }),

  /**
   *
   */
  computed: {
    /**
     *
     */
    postedAt() {
      const { createdAt } = this;
      if (!createdAt) return null;
      return moment(createdAt).format(this.dateFormat);
    },
  },

  /**
   *
   */
  methods: {
    /**
     *
     */
    element(name) {
      return `${this.blockName}__${name}`;
    },
  },
};
</script>
