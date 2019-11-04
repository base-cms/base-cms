<template>
  <div :class="classes" :data-taxonomy-ids="taxonomyIds.join(',') || null">
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
      :expanded="isExpanded"
      :contextual="isContextual"
      @card-action="emitCardAction"
    />
  </div>
</template>

<script>
import Loading from './common/loading.vue';
import LeadersSectionWrapper from './containers/section-wrapper.vue';

import allQuery from '../graphql/queries/all-sections';
import fromTaxonomyQuery from '../graphql/queries/sections-from-taxonomy';
import contentQuery from '../graphql/queries/content';
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
    contentId: {
      type: Number,
      default: null,
    },
    open: {
      type: String,
      default: 'left',
    },
    expanded: {
      type: Boolean,
      default: null,
    },
  },

  data: () => ({
    loadType: null,
    taxonomyIds: [],
    sections: [],
    isLoading: false,
    hasLoaded: false,
    error: null,
  }),

  computed: {
    isExpanded() {
      const { expanded } = this;
      if (expanded != null) return expanded;
      return this.isContextual;
    },
    isContextual() {
      return this.loadType === 'contextual';
    },
    classes() {
      const { loadType } = this;
      const blockName = 'leaders';
      const classes = [blockName];
      if (loadType) classes.push(`${blockName}--${loadType}`);
      return classes;
    },
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
          this.sections = await this.loadSections();
          this.hasLoaded = true;
        } catch (e) {
          this.error = e;
        } finally {
          this.isLoading = false;
        }
      }
    },

    async loadSections() {
      const fromContent = await this.loadContentSections();
      if (fromContent.length) {
        this.loadType = 'contextual';
        return fromContent;
      }
      return this.loadAllSections();
    },

    async loadContentSections() {
      if (!this.contentId) return [];
      const variables = { contentId: this.contentId };
      const r1 = await this.$apollo.query({ query: contentQuery, variables });
      const taxonomyIds = getEdgeNodes(r1, 'data.content.taxonomy').map(t => t.id);
      this.taxonomyIds = taxonomyIds;
      if (!taxonomyIds.length) return [];
      const r2 = await this.$apollo.query({ query: fromTaxonomyQuery, variables: { taxonomyIds } });
      const sections = getEdgeNodes(r2, 'data.websiteSections');
      return sections
        .filter(s => s.hierarchy.some(({ alias }) => alias === this.sectionAlias));
    },

    async loadAllSections() {
      const variables = { sectionAlias: this.sectionAlias };
      const { data } = await this.$apollo.query({ query: allQuery, variables });
      this.loadType = 'all';
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
