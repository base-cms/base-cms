<template>
  <div class="radix-inquiry-listener" :data-app-id="appId" />
</template>

<script>
import sendRequest from './send-request';

export default {
  inject: ['EventBus'],

  props: {
    appId: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      default: 'https://radix.as3.io',
    },
    standardFields: {
      type: Array,
      default: () => [
        { name: 'firstName', radix: 'identity:givenName' },
        { name: 'lastName', radix: 'identity:familyName' },
        { name: 'email', radix: 'identity:primaryEmail' },
        { name: 'phone', radix: 'identity:primaryPhone.number' },
        { name: 'company', radix: 'identity:companyName' },
        { name: 'jobTitle', radix: 'identity:title' },
        { name: 'postalCode', radix: 'identity:primaryAddress.postalCode' },
        { name: 'country', radix: 'identity:primaryAddress.countryCode' },
      ],
    },
    /**
     * e.g. [{ name: 'comments', id: '57e55318bcf2d6f3c30e0833' }]
     */
    submissionFieldIds: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    fields() {
      return [
        ...this.standardFields,
        ...this.submissionFieldIds.filter(f => f.id).map(f => ({ name: f.name, radix: `submission:answers.${f.id}` })),
      ];
    },
  },

  created() {
    this.EventBus.$on('inquiry-form-submit', ({ contentId, contentType, payload } = {}) => {
      const model = {
        identifier: contentId,
        type: `content-${contentType}`,
      };

      const data = this.fields
        .filter(({ name }) => payload[name])
        .reduce((o, { name, radix }) => ({ ...o, [radix]: payload[name] }), {
          'submission:referringHost': `${window.location.protocol}//${window.location.host}`,
          'submission:referringHref': window.location.href,
        });

      const body = {
        data,
        meta: { model },
        notify: { enabled: false },
      };

      if (model.identifier && model.type) {
        sendRequest({
          url: this.url,
          appId: this.appId,
          method: 'POST',
          endpoint: '/app/submission/inquiry',
          body,
        });
      }
    });
  },

  methods: {
    getElementValue(elements, name) {
      const element = elements[name];
      if (!element) return undefined;
      return element.value;
    },
  },
};
</script>
