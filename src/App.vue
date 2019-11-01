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
              <leaders>
                <div v-if="error">
                  Error! {{ error.message }}
                </div>
                <div v-else-if="isLoading">
                  Loading....
                </div>
                <div v-else-if="noResults">
                  No results
                </div>
                <section-content-loader
                  v-for="section in sections"
                  v-else
                  :key="section.id"
                  v-slot:default="{ items }"
                  :section-id="section.id"
                  :title="section.name"
                >
                  <list
                    :items="items"
                    :identifier="section.id"
                    nav-direction="vertical"
                    open="left"
                  >
                    <template #nav-link="{ item, isActive }">
                      <nav-link-contents
                        :title="item.name"
                        :is-active="isActive"
                        :youtube="item.youtube"
                      />
                    </template>
                    <template #dropdown="{ item, isActive }">
                      <card :company="item" :is-active="isActive" />
                    </template>
                  </list>
                </section-content-loader>
              </leaders>
            </aside>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { get } from '@base-cms/object-path';
import gql from 'graphql-tag';
import SectionContentLoader from './components/section-content-loader.vue';
import List from './components/list/index.vue';
import Card from './components/card/index.vue';
import Leaders from './components/root.vue';
import NavLinkContents from './components/nav-link-contents.vue';

const getNodes = (obj, field) => {
  if (!obj || !obj[field]) return [];
  return obj[field].edges.map(edge => edge.node);
};

export default {
  components: {
    Card,
    Leaders,
    List,
    NavLinkContents,
    SectionContentLoader,
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
    get(obj, path) {
      return get(obj, path);
    },

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
@import url("https://fonts.googleapis.com/css?family=Muli:300,400,600,700,800&display=swap");
@import "../node_modules/bootstrap/scss/bootstrap";
@import "./scss/document";
</style>
