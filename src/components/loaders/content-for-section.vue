<template>
  <div :class="blockName" :data-section-id="sectionId">
    <h5 :class="elementClass('title')">
      <button :class="elementClass('toggle-button')" @click="toggleExpanded">
        <plus-icon v-show="!isExpanded" />
        <minus-icon v-show="isExpanded" />
      </button>
      <span>{{ title }}</span>
    </h5>
    <div v-show="isExpanded">
      <div v-if="isLoading" :class="elementClass('loading')">
        Loading...
      </div>
      <div v-else-if="error" :class="elementClass('error')">
        Unable to load content. An error was encountered:
        {{ error.message }}
      </div>
      <div v-else-if="!items.length" :class="elementClass('no-results')">
        No results found.
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
  },

  data: () => ({
    blockName: 'leaders-content-for-section',
    items: [],
    isLoading: false,
    isExpanded: false,
    error: null,
  }),

  methods: {
    elementClass(name) {
      return `${this.blockName}__${name}`;
    },

    toggleExpanded() {
      this.isExpanded = !this.isExpanded;
    },
  },
};
</script>

<style lang="scss">
@import "../../scss/variables";

.leaders-content-for-section {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  &__title {
    margin-bottom: calc(#{$leaders-nav-link-padding-y} - #{$leaders-nav-link-padding-x});
    font-size: $leaders-section-content-title-font-size;
    font-weight: $leaders-section-content-title-font-weight;
    text-transform: $leaders-section-content-title-transform;
  }
}
</style>
