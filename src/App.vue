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
              <content-sections
                :content-id="13354061"
                leaders-section-alias="leaders"
              />
            </aside>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import ContentSections from './components/content-sections.vue';

export default {
  components: {
    ContentSections,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=IBM+Plex+Sans:300,400,500,600,700&display=swap");
@import "../node_modules/bootstrap/scss/bootstrap";
@import "./scss/document";
</style>
