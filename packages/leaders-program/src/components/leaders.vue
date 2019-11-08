<template>
  <div :class="classes" :data-taxonomy-ids="taxonomyIds.join(',') || null">
    <leaders-header
      :display="getResponsiveValue('displayHeader')"
      :img-src="headerImgSrc"
      :img-alt="headerImgAlt"
      :display-callout="getResponsiveValue('displayCallout')"
      :callout-prefix="calloutPrefix"
      :callout-value="calloutValue"
    />
    <div class="leaders__body">
      <loading
        v-if="!hasLoaded"
        :is-loading="isLoading"
        :error="error"
        :has-no-results="!sections.length"
        loading-message="Loading sections..."
        no-results-message="No sections were found."
      />
      <leaders-sections-wrapper
        :sections="sections"
        :open="getResponsiveValue('open')"
        :expanded="isExpanded"
        :contextual="isContextual"
        :columns="getResponsiveValue('columns')"
        :offset-top="getResponsiveValue('offsetTop')"
        :offset-bottom="getResponsiveValue('offsetBottom')"
        @action="emitAction"
      />
    </div>
    <div v-if="viewAll" class="leaders__footer">
      <a :href="viewAll">View All Companies &gt;</a>
    </div>
  </div>
</template>

<script>
import Loading from './common/loading.vue';
import LeadersSectionsWrapper from './containers/section-wrapper.vue';
import LeadersHeader from './header.vue';

import allQuery from '../graphql/queries/all-sections';
import fromTaxonomyQuery from '../graphql/queries/sections-from-taxonomy';
import contentQuery from '../graphql/queries/content';
import getEdgeNodes from '../utils/get-edge-nodes';

export default {
  components: {
    Loading,
    LeadersHeader,
    LeadersSectionsWrapper,
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
    contextual: {
      type: Boolean,
      default: null,
    },
    columns: {
      type: Number,
      default: 1,
    },
    mediaQueries: {
      type: Array,
      default: () => [],
      validator: values => values.every((value) => {
        if (!value || typeof value !== 'object') return false;
        const props = ['open', 'columns', 'expanded', 'displayHeader', 'displayCallout', 'offsetTop', 'offsetBottom'];
        if (!props.includes(value.prop)) return false;
        if (!value.query) return false;
        return Object.prototype.hasOwnProperty.call(value, 'value');
      }),
    },
    viewAllHref: {
      type: String,
      default: null,
    },
    displayHeader: {
      type: Boolean,
      default: true,
    },
    headerImgSrc: {
      type: String,
      default: null,
    },
    headerImgAlt: {
      type: String,
      default: null,
    },
    displayCallout: {
      type: Boolean,
      default: true,
    },
    calloutPrefix: {
      type: String,
      default: 'Browse these',
    },
    calloutValue: {
      type: String,
      default: 'leading suppliers',
    },
    offsetTop: {
      type: Number,
      default: 0,
    },
    offsetBottom: {
      type: Number,
      default: 0,
    },
  },

  data: () => ({
    loadType: null,
    taxonomyIds: [],
    sections: [],
    isLoading: false,
    hasLoaded: false,
    error: null,
    mqProps: {
      open: undefined,
      columns: undefined,
      displayHeader: undefined,
      displayCallout: undefined,
      offsetTop: undefined,
      offsetBottom: undefined,
    },
  }),

  computed: {
    viewAll() {
      return this.viewAllHref || `/${this.sectionAlias}`;
    },
    isExpanded() {
      const { expanded } = this;
      if (expanded != null) return expanded;
      return this.isContextual;
    },
    isContextual() {
      const { contextual } = this;
      if (contextual != null) return contextual;
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

  created() {
    this.createMediaQueryListeners();
  },

  mounted() {
    this.load();
  },

  methods: {
    emitAction(...args) {
      this.$emit('action', ...args);
    },

    createMediaQueryListeners() {
      this.mediaQueries.forEach((media) => {
        const listener = (query) => {
          const { prop, value } = media;
          this.mqProps[prop] = query.matches ? value : undefined;
        };
        const query = window.matchMedia(media.query);
        listener(query);
        query.addListener(listener);
      });
    },

    getResponsiveValue(prop) {
      const value = this[prop];
      const mqValue = this.mqProps[prop];
      if (mqValue === undefined) return value;
      return mqValue;
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
