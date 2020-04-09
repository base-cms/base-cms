<template>
  <div class="radix-inquiry-listener" />
</template>

<script>
import sendRequest from './send-request';

export default {
  props: {
    appId: {
      type: String,
      required: true,
    },
    selector: {
      type: String,
      default: '.inquiry-form-body form',
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
    modelIdentifierField: {
      type: String,
      default: 'contentId',
    },
    modelTypeField: {
      type: String,
      default: 'contentType',
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
    const nodeList = document.querySelectorAll('.inquiry-form-body form');
    for (let i = 0; i < nodeList.length; i += 1) {
      const { elements } = nodeList[i];

      const identifier = parseInt(this.getElementValue(elements, this.modelIdentifierField), 10);
      const type = this.getElementValue(elements, this.modelTypeField);

      const model = {
        identifier,
        ...(type && { type: `content-${type}` }),
      };

      const data = this.fields
        .filter(({ name }) => elements[name] && elements[name].value)
        .reduce((o, { name, radix }) => ({ ...o, [radix]: elements[name].value }), {
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
          appId: this.appId,
          method: 'POST',
          endpoint: '/app/submission/inquiry',
          body,
        });
      }
    }
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
