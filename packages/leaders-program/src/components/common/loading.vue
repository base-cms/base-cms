<template>
  <div :class="blockName">
    <div v-if="isLoading" :class="elementClass('wrapper')">
      <spinner />
      <span :class="elementClass('message')">
        {{ loadingMessage }}
      </span>
    </div>
    <div v-else-if="error" :class="elementClass('error')">
      {{ error.message }}
    </div>
    <div v-else-if="hasNoResults" :class="elementClass('no-results')">
      {{ noResultsMessage }}
    </div>
  </div>
</template>

<script>
import Spinner from './loading-spinner.vue';

export default {
  components: { Spinner },

  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    loadingMessage: {
      type: String,
      default: 'Loading data...',
    },
    error: {
      type: Error,
      default: null,
    },
    hasNoResults: {
      type: Boolean,
      default: false,
    },
    noResultsMessage: {
      type: String,
      default: 'No results were found.',
    },
  },

  data: () => ({
    blockName: 'leaders-loading',
  }),

  methods: {
    elementClass(name) {
      return `${this.blockName}__${name}`;
    },
  },
};
</script>
