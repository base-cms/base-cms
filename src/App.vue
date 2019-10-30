<template>
  <div class="document-container">
    <main class="page page--content">
      <div class="page-wrapper">
        <div class="page-wrapper__section">
          <div class="row">
            <div class="page-contents col-lg-8 mb-3 mb-lg-0">
              Content body here!
            </div>
            <aside class="page-rail col-lg-4">
              <div style="height: 250px; margin-bottom: 1rem;">
                Maybe an ad here?
              </div>
              <div v-if="error">
                Error! {{ error.message }}
              </div>
              <div v-else-if="isLoading">
                Loading....
              </div>
              <div v-else-if="noResults">
                No results
              </div>
              <load-section-content
                v-for="section in sections"
                v-else
                :key="section.id"
                v-slot:default="{ items }"
                :section-id="section.id"
                :title="section.name"
              >
                <leaders
                  :items="items"
                  nav-direction="vertical"
                  open="left"
                >
                  <template #nav-link="{ item }">
                    {{ item.name }}
                  </template>
                  <template #dropdown="{ item }">
                    <sample-content :label="item.name" />
                  </template>
                  <!-- @todo the link should be a slot -->
                </leaders>
              </load-section-content>
            </aside>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import LoadSectionContent from './components/leaders/load-section-content.vue';
import SampleContent from './components/sample-content.vue';
import Leaders from './components/leaders.vue';

const getNodes = (obj, field) => {
  if (!obj || !obj[field]) return [];
  return obj[field].edges.map(edge => edge.node);
};

export default {
  components: {
    Leaders,
    LoadSectionContent,
    SampleContent,
  },


  data: () => ({
    contentId: 13320089,
    sectionAlias: 'leaders',
    sections: [],

    isLoading: false,
    noResults: false,
    error: null,
  }),

  mounted() {
    this.load();
  },

  methods: {
    /**
     *
     */
    async loadTaxonomyIds() {
      const query = gql`
        query Content($input: ContentQueryInput!) {
          content(input: $input) {
            id
            taxonomy {
              edges {
                node {
                  id
                  type
                }
              }
            }
          }
        }
      `;
      const input = { id: this.contentId };
      const { data } = await this.$apollo.query({ query, variables: { input } });
      return getNodes(data.content, 'taxonomy').map(node => node.id);
    },

    /**
     *
     */
    async loadLeadersSections({ taxonomyIds }) {
      const query = gql`
        query WebsiteSections($input: WebsiteSectionsQueryInput = {}) {
          websiteSections(input: $input) {
            edges {
              node {
                id
                name
                hierarchy {
                  id
                  alias
                }
              }
            }
          }
        }
      `;
      const input = { taxonomyIds };
      const { data } = await this.$apollo.query({ query, variables: { input } });
      const sections = getNodes(data, 'websiteSections');
      if (!sections.length) return sections;
      return sections
        .filter(section => section.hierarchy.some(({ alias }) => alias === this.sectionAlias));
    },

    async load() {
      this.isLoading = true;
      try {
        const taxonomyIds = await this.loadTaxonomyIds();
        if (!taxonomyIds.length) {
          this.noResults = true;
          return;
        }
        this.sections = await this.loadLeadersSections({ taxonomyIds });
        if (!this.sections.length) {
          this.noResults = true;
          return;
        }
      } catch (e) {
        this.error = e;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Muli:300,400,600&display=swap");
@import "../node_modules/bootstrap/scss/bootstrap";
@import "./scss/document";
// @import "./scss/variables";

.leaders-nav {
  &__link {
    display: inline-block;
    padding: 10px 0;
    margin: 0;
    font-size: 16px;
    font-weight: 400;
  }
}
</style>
