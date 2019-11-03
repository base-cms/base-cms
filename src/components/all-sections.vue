<template>
  <div class="leaders-all-sections">
    <loading
      v-if="!hasLoaded"
      :is-loading="isLoading"
      :error="error"
      :has-no-results="!sections.length"
      loading-message="Loading sections..."
      no-results-message="No sections were found."
    />
    <section-content-container
      v-for="section in sections"
      v-else
      :key="section.id"
      :section-id="section.id"
      :title="section.name"
      :children="getChildren(section)"
      :expanded="false"
      @card-action="emitCardAction"
    />
  </div>
</template>

<script>
import Loading from './common/loading.vue';
import SectionContentContainer from './containers/section-content.vue';

import query from '../graphql/queries/all-sections';
import getEdgeNodes from '../utils/get-edge-nodes';

export default {
  components: { Loading, SectionContentContainer },

  props: {
    sectionAlias: {
      type: String,
      required: true,
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
    getChildren(section) {
      return getEdgeNodes(section, 'children');
    },

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
@import "../scss/variables";
@import "../scss/mixins";

.leaders-all-sections {
  @include leaders-base();
}
</style>
