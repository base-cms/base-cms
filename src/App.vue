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
              <leaders
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
import SampleContent from './components/sample-content.vue';
import Leaders from './components/leaders.vue';

export default {
  components: {
    Leaders,
    SampleContent,
  },

  data: () => ({
    items: [
      { id: 1, label: 'Robatech USA Inc', href: '#' },
      { id: 2, label: 'Schubert North America', href: '#' },
      { id: 3, label: 'Serpa Packaging Solutions', href: '#' },
      { id: 4, label: 'Soma America, Inc.', href: '#' },
    ],
  }),
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Muli:300,400,600&display=swap");
@import "../node_modules/bootstrap/scss/bootstrap";
@import "./scss/document";
// @import "./scss/variables";
</style>
