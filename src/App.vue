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
              <div>Right rail here</div>
              <div v-if="error">
                Error! {{ error.message }}
              </div>
              <div v-else-if="isLoading">
                Loading....
              </div>
              <leaders
                v-else
                :items="items"
                nav-direction="vertical"
                open="left"
              >
                <template #default="data">
                  <sample-content :label="data.item.label" />
                </template>
              </leaders>
            </aside>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import SampleContent from './components/sample-content.vue';
import Leaders from './components/leaders.vue';

const getTaxonomyIds = (content) => {
  if (!content || !content.taxonomy) return [];
  return content.taxonomy.edges.map(edge => edge.node.id);
};

export default {
  components: {
    Leaders,
    SampleContent,
  },


  data: () => ({
    isLoading: false,
    error: null,
    items: [
      { id: 1, label: 'Robatech USA Inc', href: '#' },
      { id: 2, label: 'Schubert North America', href: '#' },
      { id: 3, label: 'Serpa Packaging Solutions', href: '#' },
      { id: 4, label: 'Soma America, Inc.', href: '#' },
    ],
  }),

  mounted() {
    this.load();
  },

  methods: {
    async load() {
      this.isLoading = true;
      const contentQuery = gql`
        query ContentQuery {
          content(input: { id: 13320089 }) {
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
      try {
        const { data } = await this.$apollo.query({ query: contentQuery });
        const taxonomyIds = getTaxonomyIds(data.content);
        console.log(taxonomyIds);
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
</style>
