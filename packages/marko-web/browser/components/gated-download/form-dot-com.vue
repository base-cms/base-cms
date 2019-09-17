<template>
  <div
    v-if="canDownload"
    class="button-wrapper"
  >
    <p>
      Your download should start automatically.
      If not,
      <a
        :href="target"
        target="_blank"
        rel="noopener noreferer"
      >
        click here
      </a>
      to access this document.
    </p>
  </div>
  <div v-else>
    <strong>To access this piece of premium content, please fill out the following form:</strong>
    <iframe
      :src="formUrl"
      frameborder="0"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import cleanPath from '../../utils/clean-path';

export default {
  props: {
    surveyId: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: 'Download',
    },
    target: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      default: '1200',
    },
    width: {
      type: String,
      default: '100%',
    },
  },
  data: () => ({ canDownload: false }),
  computed: {
    formUrl() {
      return `https://app.form.com/${cleanPath(this.surveyId)}?cburl=${encodeURIComponent(window.location)}`;
    },
  },
  mounted() {
    window.addEventListener('message', (e) => {
      if (typeof e.data === 'string' && e.data.indexOf('type:whitepaper-registration') !== -1) {
        this.canDownload = true;
        window.open(this.target);
      }
    }, false);
  },
};
</script>
