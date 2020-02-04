<template>
  <div
    class="pswp"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <pswp-element name="bg" />
    <pswp-element name="scroll-wrap">
      <pswp-element name="container">
        <pswp-item />
        <pswp-item />
        <pswp-item />
      </pswp-element>

      <pswp-element name="ui" :modifiers="['hidden']">
        <pswp-element name="top-bar">
          <pswp-element name="counter" />
          <pswp-button type="close" />
          <pswp-button type="fullscreen" />
          <pswp-button type="zoom" />

          <pswp-element name="preloader">
            <pswp-element name="preloader__icn">
              <pswp-element name="preloader__cut">
                <pswp-element name="preloader__donut" />
              </pswp-element>
            </pswp-element>
          </pswp-element>
        </pswp-element>

        <pswp-button type="previous" />
        <pswp-button type="next" />
        <pswp-element name="caption">
          <pswp-element name="caption__center" />
        </pswp-element>
      </pswp-element>
    </pswp-element>
  </div>
</template>

<script>
import 'photoswipe/dist/default-skin/default-skin.png';
import 'photoswipe/dist/default-skin/default-skin.svg';
import 'photoswipe/dist/default-skin/preloader.gif';

import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI from 'photoswipe/dist/photoswipe-ui-default';
import PswpElement from './element.vue';
import PswpItem from './item.vue';
import PswpButton from './buttons/index.vue';

export default {
  components: {
    PswpElement,
    PswpItem,
    PswpButton,
  },

  props: {
    items: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    itemIdProp: {
      type: String,
      default: 'id',
    },
    thumbnailClickSelectors: {
      type: String,
      default: null,
    },
    thumbnailImageIdAttr: {
      type: String,
      default: 'data-image-id',
    },
  },

  data: () => ({
    thumbnailReadyAttr: 'data-thumbnail-ready',
    thumbnailClass: 'pswp-thumbnail',
  }),

  mounted() {
    this.addThumbnailListeners();
    this.openWhenHashPresent();
  },

  beforeDestroy() {
    this.removeThumbnailListeners();
  },

  methods: {
    openWhenHashPresent() {
      const { pid } = this.parseHashParams();
      if (pid != null) {
        const index = pid - 1;
        if (this.items[index]) this.openPhotoswipe({ index });
      }
    },

    getThumbnailImageId(el) {
      if (!el) return null;
      return el.getAttribute(this.thumbnailImageIdAttr);
    },

    getImageIndex(id) {
      if (id == null) return false;
      return this.items.reduce((found, item, index) => {
        if (found) return found;
        if (item[this.itemIdProp] === id) return `${index}`;
        return found;
      }, null);
    },

    getThumbnailElements() {
      const elements = [];
      const { thumbnailClickSelectors: selector } = this;
      if (selector) {
        const elementList = document.querySelectorAll(selector);
        for (let i = 0; i < elementList.length; i += 1) {
          const element = elementList[i];
          const imageId = this.getThumbnailImageId(element);
          const index = this.getImageIndex(imageId);
          if (index) elements.push(element);
        }
      }
      return elements;
    },

    getUnloadedThumbnails() {
      return this.getThumbnailElements().filter(el => !el.hasAttribute(this.thumbnailReadyAttr));
    },

    getLoadedThumbnails() {
      return this.getThumbnailElements().filter(el => el.hasAttribute(this.thumbnailReadyAttr));
    },

    addThumbnailListeners() {
      const elements = this.getUnloadedThumbnails();
      elements.forEach((el) => {
        el.addEventListener('click', this.handleThumbnailClick);
        el.setAttribute(this.thumbnailReadyAttr, true);
        el.classList.add(this.thumbnailClass);
      });
    },

    removeThumbnailListeners() {
      const elements = this.getLoadedThumbnails();
      elements.forEach(el => el.removeEventListener('click', this.handleThumbnailClick));
    },

    handleThumbnailClick(event) {
      const imageId = this.getThumbnailImageId(event.target);
      const index = this.getImageIndex(imageId);
      if (index) this.openPhotoswipe({ index });
    },

    openPhotoswipe({ index }) {
      const options = { ...this.options };
      if (index != null) options.index = parseInt(index, 10);
      const pswp = new PhotoSwipe(this.$el, PhotoSwipeUI, this.items, options);
      pswp.init();
    },

    parseHashParams() {
      const hash = window.location.hash.substring(1);
      const params = {};
      const parts = hash.split('&');
      for (let i = 0; i < parts.length; i += 1) {
        if (parts[i]) {
          const pair = parts[i].split('=');
          if (pair.length >= 2) {
            const [key, val] = pair;
            params[key] = val;
          }
        }
      }
      if (params.gid) params.gid = parseInt(params.gid, 10);
      if (params.pid) params.pid = parseInt(params.pid, 10);
      return params;
    },
  },
};
</script>
