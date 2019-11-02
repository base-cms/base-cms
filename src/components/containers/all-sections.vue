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
    <!-- @todo handle grandchild sections, e.g. packworld -->
    <content-for-section
      v-for="section in sections"
      v-else
      :key="section.id"
      :section-id="section.id"
      :title="section.name"
      :expanded="false"
    />
  </div>
</template>

<script>
import Loading from '../common/loading.vue';
import ContentForSection from './content-for-section.vue';

import query from '../../graphql/queries/all-sections';
import getEdgeNodes from '../../utils/get-edge-nodes';

export default {
  components: { Loading, ContentForSection },

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
      // @todo account for grandchild sections, e.g. packworld.
      return getEdgeNodes(data, 'websiteSectionAlias.children');
    },
  },
};
</script>
