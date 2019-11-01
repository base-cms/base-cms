
<template>
  <div :class="classes">
    <div class="leaders-card__header">
      <div class="leaders-card__header-left">
        <company-details
          :company-name="company.name"
          :logo-src="logo.src"
          :profile-href="profileHref"
          :company-href="company.website"
        />
      </div>
      <div v-if="displayRightHeader" class="leaders-card__header-right">
        <div v-if="displayRightTopHeader" class="leaders-card__header-right-top">
          <company-summary
            :headline="company.productSummary"
            :teaser="company.teaser"
            :profile-href="profileHref"
          />
        </div>
        <div v-if="displayRightBottomHeader" class="leaders-card__header-right-bottom">
          <key-executive
            :name="executive.name"
            :title="executive.title"
            :image-src="get(executive, 'primaryImage.src')"
          />
        </div>
      </div>
    </div>
    <div v-if="displayBody" class="leaders-card__body">
      <content-deck :value="promotions" :limit="4" :item-modifiers="['promo']">
        <template #header-left>
          Featured Products
        </template>
        <template #header-right>
          <a :href="profileHref">View more products &raquo;</a>
        </template>
        <template #default="{ item }">
          <promotion-card
            :data-content-id="item.id"
            :title="item.linkText || item.name"
            :href="item.linkUrl"
            :image-src="get(item, 'primaryImage.src')"
            :image-alt="get(item, 'primaryImage.alt')"
            :image-is-logo="get(item, 'primaryImage.isLogo')"
          />
        </template>
      </content-deck>
      <content-deck :value="videos" :limit="3" :item-modifiers="['video']">
        <template #header-left>
          Featured Videos
        </template>
        <template #header-right>
          <a :href="profileHref">View more videos &raquo;</a>
        </template>
        <template #default="{ item }">
          <video-card
            :data-youtube-id="item.id"
            :title="item.title"
            :href="item.url"
            :image-src="item.thumbnail"
          />
        </template>
      </content-deck>
    </div>
  </div>
</template>

<script>
import { get, getAsObject } from '@base-cms/object-path';
import CompanyDetails from './blocks/company-details.vue';
import CompanySummary from './blocks/company-summary.vue';
import ContentDeck from './blocks/content-deck.vue';
import KeyExecutive from './blocks/key-executive.vue';
import PromotionCard from './blocks/promotion-card.vue';
import VideoCard from './blocks/video-card.vue';
import getEdgeNodes from '../../utils/get-edge-nodes';

export default {
  components: {
    CompanyDetails,
    CompanySummary,
    ContentDeck,
    KeyExecutive,
    PromotionCard,
    VideoCard,
  },

  props: {
    company: {
      type: Object,
      default: () => ({}),
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    logo() {
      return getAsObject(this.company, 'primaryImage');
    },
    profileHref() {
      return get(this.company, 'siteContext.path');
    },
    executive() {
      return getEdgeNodes(this.company, 'publicContacts')[0];
    },
    promotions() {
      return getEdgeNodes(this.company, 'promotions');
    },
    videos() {
      return getEdgeNodes(this.company, 'videos');
    },
    displayBody() {
      return Boolean(this.promotions.length || this.videos.length);
    },
    displayRightHeader() {
      return this.displayRightTopHeader || this.displayRightBottomHeader;
    },
    displayRightTopHeader() {
      return Boolean(this.company.productSummary || this.company.teaser);
    },
    displayRightBottomHeader() {
      return Boolean(this.executive);
    },
    classes() {
      const blockName = 'leaders-card';
      const classes = [blockName];
      if (this.isActive) classes.push(`${blockName}--active`);
      return classes;
    },
  },

  methods: {
    get(obj, path) {
      return get(obj, path);
    },
  },
};
</script>

<style lang="scss">
@import "../../scss/variables";
@import "../../scss/mixins";

.leaders-card {
  $block: &;
  display: flex;
  flex-direction: column;
  min-width: 0;
  max-width: leaders-card-width();
  word-wrap: break-word;
  background-clip: border-box;

  &__header {
    display: flex;
    flex-direction: row;
    padding: $leaders-card-padding;
    color: $leaders-card-header-color;
    background-color: $leaders-card-initial-bg-color;
    opacity: $leaders-card-initial-opacity;
    transition-duration: $leaders-card-transition-duration;
    transition-property: $leaders-card-transition-property;
  }

  &__body {
    flex: 1 1 auto;
    padding: $leaders-card-padding;
    font-size: $leaders-card-body-font-size;
    font-weight: $leaders-card-body-font-weight;
    color: $leaders-card-body-color;
    background-color: $leaders-card-initial-bg-color;
    opacity: $leaders-card-initial-opacity;
    transition-duration: $leaders-card-transition-duration;
    transition-property: $leaders-card-transition-property;

    > div:not(:last-child) {
      margin-bottom: $leaders-card-padding;
    }
  }

  &__header-left + &__header-right {
    padding-left: $leaders-card-padding;
    border-left: 1px solid $leaders-card-header-hr-color;
  }

  &__header-left:not(:only-child) {
    padding-right: $leaders-card-padding;
  }

  &__header-right-top + &__header-right-bottom {
    padding-top: $leaders-card-padding;
    border-top: 1px solid $leaders-card-header-hr-color;
  }

  &__header-right-top:not(:only-child) {
    padding-bottom: $leaders-card-padding;
  }

  &--active {
    #{ $block } {
      &__header {
        background-color: $leaders-card-header-bg-color;
        opacity: $leaders-card-final-opacity;
      }
      &__body {
        background-color: $leaders-card-body-bg-color;
        opacity: $leaders-card-final-opacity;
      }
    }
  }
}

</style>
