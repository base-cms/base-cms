<template>
  <div class="leaders-section-content" :data-section-id="sectionId">
    <h5 class="leaders-section-content__title">
      {{ title }}
    </h5>
    <p v-if="isLoading">
      Loading...
    </p>
    <p v-else-if="error">
      Unable to load content. An error was encountered:
      {{ error.message }}
    </p>
    <p v-else-if="!items.length">
      No results found.
    </p>
    <slot v-else :items="items" />
  </div>
</template>

<script>
import query from '../../graphql/section-content-query';

export default {
  props: {
    sectionId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    limit: {
      type: Number,
      default: 0,
    },
  },

  data: () => ({
    error: null,
    items: [],
  }),

  computed: {
    isLoading() {
      return this.$apollo.loading;
    },
  },

  /**
   *
   */
  apollo: {
    items: {
      query,
      fetchPolicy: 'cache-and-network',
      variables() {
        const input = {
          sectionId: this.sectionId,
          pagination: { limit: this.limit },
          sort: { field: 'name', order: 'asc' },
        };
        return { input };
      },
      update({ websiteScheduledContent }) {
        if (!websiteScheduledContent) return [];
        return websiteScheduledContent.edges.map(edge => edge.node);
      },
      error(e) {
        this.error = e;
      },
    },
  },
};
</script>
