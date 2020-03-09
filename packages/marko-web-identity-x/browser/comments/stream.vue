<template>
  <div :class="classNames">
    <div :class="element('header')">
      {{ headerText }}
    </div>

    <div :class="element('body')">
      <div
        v-if="hasActiveUser"
        :class="element('create-post')"
      >
        Post new comment
      </div>
      <div v-else :class="element('login-form')">
        <p :class="element('login-message')">
          This site requires you to login or register to post a comment.
        </p>
        <login
          :active-user="activeUser"
          :endpoints="endpoints"
          :consent-policy="consentPolicy"
        />
      </div>
      <div v-if="isLoading">
        Loading comments...
      </div>
      <div v-else-if="error">
        Unable to load comments: {{ error.message }}
      </div>
      <div v-else>
        <div v-for="comment in comments" :key="comment.id">
          <div>Posted by {{ comment.user.displayName }}</div>
          <div>{{ comment.body }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import get from '../utils/get';
import Login from '../login.vue';
// Posting As
// Your Comment

export default {
  /**
   *
   */
  components: { Login },

  /**
   *
   */
  props: {
    activeUser: {
      type: Object,
      default: () => {},
    },
    identifier: {
      type: String,
      required: true,
    },
    endpoints: {
      type: Object,
      required: true,
    },
    headerText: {
      type: String,
      default: 'Voice your opinion!',
    },
    modifiers: {
      type: Array,
      default: () => [],
    },
    consentPolicy: {
      type: String,
      default: null,
    },
  },

  data: () => ({
    blockName: 'idx-comment-stream',
    isLoading: false,
    error: null,
    comments: [],
  }),

  computed: {
    /**
     *
     */
    classNames() {
      const { blockName } = this;
      const classNames = [blockName];
      this.modifiers.map(mod => classNames.push(`${blockName}--${mod}`));
      return classNames;
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
  created() {
    this.load();
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

    /**
     *
     */
    async load() {
      this.error = null;
      this.isLoading = true;
      try {
        const res = await get(`/comments/${this.identifier}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        this.comments = data.edges.map(edge => edge.node);
      } catch (e) {
        this.error = e;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
