<template>
  <div :class="blockName" :data-id="id">
    <div :class="element('header')">
      <div :class="element('display-name')">
        Posted by {{ displayName }}
      </div>
      <div :class="element('created-at')">
        {{ createdAt }}
      </div>
    </div>
    <div :class="element('body')">
      {{ body }}
    </div>
  </div>
</template>

<script>
export default {
  /**
   *
   */
  props: {
    id: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Number,
      required: true,
    },
    approved: {
      type: Boolean,
      default: true,
    },
  },

  /**
   *
   */
  data: () => ({
    blockName: 'idx-comment-post',
  }),

  /**
   *
   */
  methods: {
    /**
     *
     */
    element(name) {
      return `${this.blockName}__${name}`;
    },
  },
};
</script>
