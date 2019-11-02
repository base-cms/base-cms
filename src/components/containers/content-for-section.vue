<template>
  <div :class="blockName" :data-section-id="sectionId">
    <button :class="elementClass('toggle-button')" @click="toggleExpanded">
      <plus-icon v-show="!isExpanded" />
      <minus-icon v-show="isExpanded" />
      <span :class="elementClass('title')">{{ title }}</span>
    </button>
    <div v-if="isExpanded">
      <div v-if="isLoading" :class="elementClass('loading')">
        Loading content...
      </div>
      <div v-else-if="error" :class="elementClass('error')">
        {{ error.message }}
      </div>
      <div v-else-if="!items.length" :class="elementClass('no-results')">
        No content was found.
      </div>
      <div v-else>
        Loaded! Found {{ items.length }} items.
      </div>
    </div>
  </div>
</template>

<script>
import PlusIcon from '../icons/add-circle-outline.vue';
import MinusIcon from '../icons/remove-circle-outline.vue';
import query from '../../graphql/queries/content-for-section';
import getEdgeNodes from '../../utils/get-edge-nodes';

export default {
  components: {
    PlusIcon,
    MinusIcon,
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
    expanded: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    blockName: 'leaders-content-for-section',
    items: [],
    isLoading: false,
    hasLoaded: false,
    isExpanded: false,
    error: null,
  }),

  computed: {
    canLoad() {
      return this.isExpanded && (!this.isLoading || !this.hasLoaded);
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

    toggleExpanded() {
      this.isExpanded = !this.isExpanded;
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

<style lang="scss">
@import "../../scss/variables";

.leaders-content-for-section {
  margin-bottom: 20px;

  &__title {
    margin-left: 5px;
  }

  &__toggle-button {
    padding: 0;
    margin: 0;
    font-size: $leaders-section-content-title-font-size;
    font-weight: $leaders-section-content-title-font-weight;
    text-align: left;
    text-decoration: none;
    text-transform: $leaders-section-content-title-transform;
    cursor: pointer;
    user-select: none;
    background: none;
    border: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;

    &:focus,
    &:active {
      outline: none;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
