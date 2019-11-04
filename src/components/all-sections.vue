<template>
  <div class="leaders leaders--all">
    <loading
      v-if="!hasLoaded"
      :is-loading="isLoading"
      :error="error"
      :has-no-results="!sections.length"
      loading-message="Loading sections..."
      no-results-message="No sections were found."
    />
    <leaders-section-wrapper
      v-for="section in sections"
      v-else
      :key="section.id"
      :section="section"
      :open="open"
      @card-action="emitCardAction"
    />
  </div>
</template>

<script>
import Loading from './common/loading.vue';
import LeadersSectionWrapper from './containers/section-wrapper.vue';

import query from '../graphql/queries/all-sections';
import getEdgeNodes from '../utils/get-edge-nodes';

export default {
  components: {
    Loading,
    LeadersSectionWrapper,
  },

  props: {
    sectionAlias: {
      type: String,
      required: true,
    },
    open: {
      type: String,
      default: 'right',
    },
  },

  data: () => ({
    sections: [],
    isLoading: false,
    hasLoaded: false,
    error: null,
  }),

  computed: {
    canLoad() {
      return !this.isLoading || !this.hasLoaded;
    },
  },

  mounted() {
    this.load();
  },

  methods: {
    emitCardAction(...args) {
      this.$emit('card-action', ...args);
    },

    async load() {
      if (this.canLoad) {
        this.isLoading = true;
        this.error = null;
        try {
          this.sections = await this.loadAllSections();
          this.hasLoaded = true;
        } catch (e) {
          this.error = e;
        } finally {
          this.isLoading = false;
        }
      }
    },

    async loadAllSections() {
      const variables = { sectionAlias: this.sectionAlias };
      const { data } = await this.$apollo.query({ query, variables });
      return getEdgeNodes(data, 'websiteSectionAlias.children');
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=IBM+Plex+Sans:300,400,500,600,700&display=swap");
@import "../scss/variables";
@import "../scss/mixins";

.leaders {
  @include leaders-base();
}
</style>
