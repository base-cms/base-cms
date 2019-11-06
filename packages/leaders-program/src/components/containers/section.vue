<template>
  <div :class="classes" :data-section-id="sectionId">
    <button class="leaders-section__toggle-button" @click="toggleExpanded">
      <plus-icon v-show="!isExpanded" :modifiers="iconModifiers" />
      <minus-icon v-show="isExpanded" :modifiers="iconModifiers" />
      <span class="leaders-section__toggle-button-title">{{ title }}</span>
    </button>
    <div v-if="isExpanded" class="leaders-section__list">
      <loading
        v-if="!hasLoaded"
        :is-loading="isLoading"
        :error="error"
        :has-no-results="!items.length"
        loading-message="Loading content..."
        no-results-message="No content was found."
      />
      <list
        v-else
        :items="items"
        :identifier="sectionId"
        :open="open"
        nav-direction="vertical"
        @link-action="emitAction"
      >
        <template #nav-link="{ item, isActive }">
          <link-contents
            :title="item.name"
            :is-active="isActive"
            :youtube="item.youtube"
          />
        </template>
        <template #dropdown="{ item, isActive }">
          <card :company="item" :is-active="isActive" @action="emitAction" />
        </template>
      </list>
    </div>
  </div>
</template>

<script>
import PlusIcon from '../icons/add-circle-outline.vue';
import MinusIcon from '../icons/remove-circle-outline.vue';
import Loading from '../common/loading.vue';

import List from '../list/index.vue';
import Card from '../card/index.vue';
import LinkContents from '../list/nav/contents.vue';

import query from '../../graphql/queries/content-for-section';
import getEdgeNodes from '../../utils/get-edge-nodes';

export default {
  components: {
    PlusIcon,
    MinusIcon,
    Loading,
    List,
    Card,
    LinkContents,
  },

  props: {
    sectionId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    open: {
      type: String,
      default: 'left',
    },
    expanded: {
      type: Boolean,
      default: false,
    },
    contextual: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    blockName: 'leaders-section',
    items: [],
    isLoading: false,
    hasLoaded: false,
    isExpanded: false,
    error: null,
  }),

  computed: {
    classes() {
      const { blockName } = this;
      const classes = [blockName];
      if (this.contextual) classes.push(`${blockName}--contextual`);
      return classes;
    },
    iconModifiers() {
      const mods = [];
      if (!this.contextual) mods.push('primary-color-light');
      return mods;
    },
    canLoad() {
      return this.isExpanded && (!this.isLoading || !this.hasLoaded);
    },
    hasChildren() {
      return Boolean(this.children.length);
    },
  },

  watch: {
    isExpanded() {
      this.loadContent();
    },
  },

  created() {
    this.isExpanded = this.expanded;
  },

  methods: {
    elementClass(name) {
      return `${this.blockName}__${name}`;
    },

    emitAction(...args) {
      this.$emit('action', ...args);
    },

    toggleExpanded() {
      this.isExpanded = !this.isExpanded;
      this.emitAction({
        type: this.isExpanded ? 'expand' : 'collapse',
        label: 'Section Item',
        category: 'Leaders Sections Nav',
      }, {
        sectionId: this.sectionId,
        sectionName: this.title,
      });
    },

    async loadContent() {
      if (this.canLoad) {
        this.isLoading = true;
        this.error = null;
        try {
          const variables = { sectionId: this.sectionId };
          const { data } = await this.$apollo.query({ query, variables });
          this.items = getEdgeNodes(data, 'websiteScheduledContent');
          this.hasLoaded = true;
        } catch (e) {
          this.error = e;
        } finally {
          this.isLoading = false;
        }
      }
    },
  },
};
</script>
