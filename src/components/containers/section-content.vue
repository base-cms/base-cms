<template>
  <div class="leaders-section" :data-section-id="sectionId">
    <div v-if="children.length" class="leaders-section__children">
      <div class="leaders-section__title">
        {{ title }}
      </div>
      <section-content-list
        v-for="section in children"
        :key="section.id"
        :section-id="section.id"
        :title="section.name"
        :expanded="expanded"
        :has-parent="true"
        @action="emitCardAction"
      />
    </div>
    <section-content-list
      v-else
      :section-id="sectionId"
      :title="title"
      :expanded="expanded"
      @action="emitCardAction"
    />
  </div>
</template>

<script>
import SectionContentList from './section-content-list.vue';

export default {
  components: {
    SectionContentList,
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
    children: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    hasChildren() {
      return Boolean(this.children.length);
    },
  },

  methods: {
    emitCardAction(...args) {
      this.$emit('card-action', ...args);
    },
  },
};
</script>

<style lang="scss">
@import "../../scss/variables";

.leaders-section {
  margin-bottom: 15px;

  &__title {
    width: 100%;
    margin-bottom: 8px;
    font-size: $leaders-parent-section-content-title-font-size;
    font-weight: $leaders-parent-section-content-title-font-weight;
    color: $leaders-parent-section-content-title-color;
    text-transform: $leaders-parent-section-content-title-transform;
    border-bottom: 1px solid $leaders-parent-section-content-title-border-color;
  }

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
