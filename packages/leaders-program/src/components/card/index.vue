
<template>
  <div :class="classes">
    <div class="leaders-card__header">
      <div class="leaders-card__header-left">
        <company-details
          :company-name="company.name"
          :logo-src="logo.src"
          :profile-href="profileHref"
          :company-href="company.website"
          @profile-click="handleProfileClick"
          @website-click="handleWebsiteClick"
        />
      </div>
      <div v-if="displayRightHeader" class="leaders-card__header-right">
        <div v-if="displayRightTopHeader" class="leaders-card__header-right-top">
          <company-summary
            :headline="company.productSummary"
            :teaser="company.teaser"
            :profile-href="profileHref"
            @profile-click="handleProfileClick"
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
          <view-more label="products" :href="profileHref" @click="handleProfileClick" />
        </template>
        <template #default="{ item }">
          <promotion-card
            :content-id="item.id"
            :title="item.linkText || item.name"
            :href="item.linkUrl"
            :image-src="get(item, 'primaryImage.src')"
            :image-alt="get(item, 'primaryImage.alt')"
            :image-is-logo="get(item, 'primaryImage.isLogo')"
            @click="handlePromotionClick"
          />
        </template>
      </content-deck>
      <content-deck :value="videos" :limit="3" :item-modifiers="['video']">
        <template #header-left>
          Featured Videos
        </template>
        <template #header-right>
          <view-more label="videos" :href="profileHref" @click="handleProfileClick" />
        </template>
        <template #default="{ item }">
          <video-card
            :video-id="item.id"
            :title="item.title"
            :href="item.url"
            :image-src="item.thumbnail"
            @click="handeVideoClick"
          />
        </template>
      </content-deck>
    </div>
  </div>
</template>

<script>
import { get } from 'object-path';
import CompanyDetails from './blocks/company-details.vue';
import CompanySummary from './blocks/company-summary.vue';
import ContentDeck from './blocks/content-deck.vue';
import KeyExecutive from './blocks/key-executive.vue';
import PromotionCard from './blocks/promotion-card.vue';
import VideoCard from './blocks/video-card.vue';
import ViewMore from './blocks/view-more.vue';
import getAsObject from '../../utils/get-as-object';
import getEdgeNodes from '../../utils/get-edge-nodes';

export default {
  components: {
    CompanyDetails,
    CompanySummary,
    ContentDeck,
    KeyExecutive,
    PromotionCard,
    VideoCard,
    ViewMore,
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

  watch: {
    isActive() {
      const type = this.isActive ? 'open' : 'close';
      this.emitAction({ type });
    },
  },

  methods: {
    get(obj, path) {
      return get(obj, path);
    },
    handleProfileClick(data, event) {
      this.emitAction({
        type: 'click',
        label: 'Profile Page',
      }, data, event);
    },
    handleWebsiteClick(data, event) {
      this.emitAction({
        type: 'click',
        label: 'Company Website',
      }, data, event);
    },
    handeVideoClick(data, event) {
      this.emitAction({
        type: 'click',
        label: 'YouTube Video',
      }, data, event);
    },
    handlePromotionClick(data, event) {
      this.emitAction({
        type: 'click',
        label: 'Promotion Item',
      }, data, event);
    },

    emitAction(action, data, event) {
      this.$emit('action', {
        ...action,
        category: 'Leaders Data Card',
      }, {
        ...data,
        companyId: this.company.id,
        companyName: this.company.name,
        date: Date.now(),
      }, event);
    },
  },
};
</script>
