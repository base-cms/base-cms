<template>
  <div
    class="leaders-content-sections"
    :data-content-id="contentId"
    :data-taxonomy-ids="taxonomyIds.join(',')"
  >
    <loading
      v-if="!hasLoaded"
      :is-loading="isLoading"
      :error="error"
      loading-message="Loading sections..."
      no-results-message="No sections were found."
    />
    <all-sections
      v-else-if="hasLoaded && !sections.length"
      :section-alias="sectionAlias"
      :open="open"
      @card-action="emitCardAction"
    />
    <section-content-container
      v-for="section in sections"
      v-else
      :key="section.id"
      :section-id="section.id"
      :title="section.name"
      :expanded="isExpanded"
      :open="open"
      @card-action="emitCardAction"
    />
  </div>
</template>

<script>
import Loading from './common/loading.vue';
import AllSections from './all-sections.vue';
import SectionContentContainer from './containers/section-content.vue';
import contentQuery from '../graphql/queries/content';
import sectionsQuery from '../graphql/queries/sections-from-taxonomy';
import getEdgeNodes from '../utils/get-edge-nodes';

export default {
  components: { Loading, SectionContentContainer, AllSections },

  props: {
    contentId: {
      type: Number,
      required: true,
    },
    sectionAlias: {
      type: String,
      required: true,
    },
    expanded: {
      type: Boolean,
      default: true,
    },
    open: {
      type: String,
      default: 'left',
    },
  },

  data: () => ({
    taxonomyIds: [],
    sections: [],
    isLoading: false,
    hasLoaded: false,
    error: null,
  }),

  computed: {
    canLoad() {
      return !this.isLoading || !this.hasLoaded;
    },

    isExpanded() {
      if (this.taxonomyIds.length) return this.expanded;
      return false;
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
          this.taxonomyIds = await this.loadTaxonomyIds();
          this.sections = await this.loadSections();
          this.hasLoaded = true;
        } catch (e) {
          this.error = e;
        } finally {
          this.isLoading = false;
        }
      }
    },

    async loadTaxonomyIds() {
      const variables = { contentId: this.contentId };
      const { data } = await this.$apollo.query({ query: contentQuery, variables });
      return getEdgeNodes(data, 'content.taxonomy').map(t => t.id);
    },

    async loadSections() {
      const { taxonomyIds } = this;
      if (!taxonomyIds.length) return [];
      const variables = { taxonomyIds };
      const { data } = await this.$apollo.query({ query: sectionsQuery, variables });
      const sections = getEdgeNodes(data, 'websiteSections');
      return sections
        .filter(s => s.hierarchy.some(({ alias }) => alias === this.sectionAlias));
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=IBM+Plex+Sans:300,400,500,600,700&display=swap");
@import "../scss/variables";
@import "../scss/mixins";

.leaders-content-sections {
  @include leaders-base();
}
</style>
