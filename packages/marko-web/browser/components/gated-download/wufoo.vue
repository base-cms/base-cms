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
    <div :id="formId" />
  </div>
</template>

<script>
import cleanPath from '../../utils/clean-path';

export default {
  props: {
    formHash: {
      type: String,
      required: true,
    },
    userName: {
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
      default: '400',
    },
  },
  data: () => ({ canDownload: false }),
  computed: {
    formId() {
      return `wufoo-${this.formHash}`;
    },
    formUrl() {
      return `https://${this.userName}.wufoo.com/forms/${cleanPath(this.formHash)}`;
    },
  },
  async mounted() {
    if (!window.WufooForm) {
      await (new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = 'https://secure.wufoo.com/scripts/embed/form.js';
        s.async = 1;
        s.onerror = () => reject(new Error('Unable to load Wufoo form script.'));
        s.onload = resolve;
        const scr = document.getElementsByTagName('script')[0];
        scr.parentNode.insertBefore(s, scr);
      }));
    }
    this.init();
  },
  methods: {
    init() {
      const options = {
        userName: this.userName,
        formHash: this.formHash,
        autoResize: true,
        height: this.height,
        header: 'hide',
        async: true,
        ssl: true,
        addSubmitListener: (e) => {
          if (e.data === 'wufoo-submit-done') {
            this.canDownload = true;
            window.open(this.target);
          }
        },
      };
      const instance = new window.WufooForm();
      instance.initialize(options);
      instance.display();
    },
  },
};
</script>
