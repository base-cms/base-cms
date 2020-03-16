<template>
  <div :class="blockName" :data-id="id">
    <div :class="element('header')">
      <div :class="element('display-name')">
        <span>Posted by {{ displayName }}</span>
        <span v-if="!approved">(pending moderation)</span>
      </div>
      <div>
        <span :class="element('created-at')">
          {{ postedAt }}
        </span>
        <span v-if="hasActiveUser && !flagged">
          <a
            href="#report-post"
            title="Report post as inappropriate."
            @click.prevent="reportComment"
          >
            Report
          </a>
        </span>
      </div>
    </div>
    <div :class="element('body')">
      <p v-if="flagged" :class="element('flagged')">
        This comment has been reported.
      </p>
      {{ body }}
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import post from '../utils/post';
import FormError from '../errors/form';

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
    flagged: {
      type: Boolean,
      default: false,
    },
    dateFormat: {
      type: String,
      default: 'MMM Do, YYYY h:mma',
    },
    activeUser: {
      type: Object,
      default: () => {},
    },
  },

  /**
   *
   */
  data: () => ({
    blockName: 'idx-comment-post',
    isReporting: false,
    error: null,
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

    /**
     *
     */
    hasActiveUser() {
      return this.activeUser && this.activeUser.email;
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

    async reportComment() {
      if (this.isReporting) return;
      this.error = null;
      this.isReporting = true;
      try {
        const res = await post(`/comment/flag/${this.id}`);
        const data = await res.json();
        if (!res.ok) throw new FormError(data.message, res.status);
        this.$emit('reported');
      } catch (e) {
        this.error = e;
      } finally {
        this.isReporting = false;
      }
    },
  },
};
</script>
