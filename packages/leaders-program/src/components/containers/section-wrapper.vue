<template>
  <div v-if="parents.length" class="leaders-sections-wrapper">
    <div
      v-for="section in parents"
      :key="section.id"
      class="leaders-section leaders-section--with-parent"
    >
      <div class="leaders-section__title">
        {{ section.name }}
      </div>
      <div class="leaders-section__children">
        <leaders-columns
          :number="columns"
          :sections="getChildren(section)"
          #default="{ sections: colSections }"
        >
          <leaders-section
            v-for="colSection in colSections"
            :key="colSection.id"
            :section-id="colSection.id"
            :title="colSection.name"
            :open="open"
            :expanded="expanded"
            :contextual="contextual"
            @action="emitAction"
          />
        </leaders-columns>
      </div>
    </div>
  </div>
  <div v-else class="leaders-sections-wrapper">
    <leaders-columns
      :number="columns"
      :sections="sections"
      #default="{ sections: colSections }"
    >
      <leaders-section
        v-for="colSection in colSections"
        :key="colSection.id"
        :section-id="colSection.id"
        :title="colSection.name"
        :open="open"
        :expanded="expanded"
        :contextual="contextual"
        @action="emitAction"
      />
    </leaders-columns>
  </div>
</template>

<script>
import LeadersSection from './section.vue';
import LeadersColumns from './columns.vue';
import getAsArray from '../../utils/get-as-array';
import getEdgeNodes from '../../utils/get-edge-nodes';

export default {
  components: {
    LeadersSection,
    LeadersColumns,
  },

  props: {
    sections: {
      type: Array,
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
    columns: {
      type: Number,
      default: 1,
    },
  },

  computed: {
    parents() {
      return this.sections.filter((section) => {
        const children = getAsArray(section, 'children.edges');
        return children.length > 0;
      });
    },
  },

  methods: {
    getChildren(section) {
      return getEdgeNodes(section, 'children');
    },

    emitAction(...args) {
      this.$emit('action', ...args);
    },
  },
};
</script>
