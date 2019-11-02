<template>
  <div
    class="leaders-sections-from-content"
    :data-content-id="contentId"
    :data-taxonomy-ids="taxonomyIds.join(',')"
  >
    <loading
      v-if="!hasLoaded"
      :is-loading="isLoading"
      :error="error"
      :has-no-results="!sections.length"
      loading-message="Loading sections..."
      no-results-message="No sections were found."
    />
    <!-- @todo if taxonomies or contextual sections are empty, load all sections -->
    <content-for-section
      v-for="section in sections"
      v-else
      :key="section.id"
      :section-id="section.id"
      :title="section.name"
      :expanded="isExpanded"
    />
  </div>
</template>

<script>
import Loading from '../common/loading.vue';
import ContentForSection from './content-for-section.vue';
import contentQuery from '../../graphql/queries/content';
import sectionsQuery from '../../graphql/queries/sections-from-taxonomy';
import getEdgeNodes from '../../utils/get-edge-nodes';

export default {
  components: { Loading, ContentForSection },

  props: {
    contentId: {
      type: Number,
      required: true,
    },
    leadersSectionAlias: {
      type: String,
      required: true,
    },
    expanded: {
      type: Boolean,
      default: true,
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
      const variables = { taxonomyIds };
      const { data } = await this.$apollo.query({ query: sectionsQuery, variables });
      const sections = getEdgeNodes(data, 'websiteSections');
      return sections
        .filter(s => s.hierarchy.some(({ alias }) => alias === this.leadersSectionAlias));
    },
  },
};
</script>
