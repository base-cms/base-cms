<template>
  <form @submit.prevent="$emit('submit', values)">
    <p>{{ callToAction }}</p>
    <fieldset :disabled="disabled">
      <div class="row">
        <!-- common, loopable fields -->
        <div
          v-for="fieldKey in componentFields"
          :key="fieldKey"
          class="col-md-6"
        >
          <component
            :is="components[fieldKey]"
            v-model="values[fieldKey]"
            required
          />
        </div>

        <!-- locale dependent fields -->
        <div v-if="displayCountryField" class="col-md-6">
          <country-code v-model="values.countryCode" required />
        </div>
        <div v-if="displayRegionField" class="col-md-6">
          <region-code v-model="values.regionCode" :country-code="values.countryCode" required />
        </div>
        <div v-if="displayPostalCodeField" class="col-md-6">
          <postal-code v-model="values.postalCode" required />
        </div>
      </div>

      <div v-if="regionalPolicyFields.length" class="row mt-3">
        <div class="col-12">
          <regional-policy
            v-for="policy in regionalPolicyFields"
            :id="policy.id"
            :key="policy.id"
            :message="policy.message"
            :required="policy.required"
            :value="getRegionalPolicyAnswerValue(policy.id)"
            @input="setPolicyAnswer(policy.id, $event)"
          />
        </div>
      </div>

      <small
        v-if="consentPolicy"
        class="text-muted mb-3"
        v-html="consentPolicy"
      />

      <button
        type="submit"
        class="btn btn-primary"
      >
        {{ buttonLabel }}
      </button>
    </fieldset>
  </form>
</template>

<script>
import GivenName from './form/fields/given-name.vue';
import FamilyName from './form/fields/family-name.vue';
import Organization from './form/fields/organization.vue';
import OrganizationTitle from './form/fields/organization-title.vue';
import CountryCode from './form/fields/country.vue';
import RegionCode from './form/fields/region.vue';
import PostalCode from './form/fields/postal-code.vue';

import RegionalPolicy from './form/fields/regional-policy.vue';

import regionCountryCodes from './utils/region-country-codes';

export default {
  components: {
    CountryCode,
    RegionCode,
    PostalCode,
    RegionalPolicy,
  },

  props: {
    /**
     * The field keys to display on the pre-login form.
     * All will be set as required.
     *
     * Example:
     * [
     *   'countryCode',
     *   'regionCode',
     * ]
     */
    fields: {
      type: Array,
      required: true,
    },

    /**
     * The form button label
     */
    buttonLabel: {
      type: String,
      default: 'Submit',
    },

    /**
     * The form call-to-action
     */
    callToAction: {
      type: String,
      default: 'To complete your login/registration, please fill out the fields below.',
    },

    /**
     * The form submit consent policy, if present.
     */
    consentPolicy: {
      type: String,
      default: null,
    },

    /**
     * Whether the form's fieldset is disabled
     */
    disabled: {
      type: Boolean,
      default: false,
    },

    /**
     * Regional consent policies to display, if any.
     */
    regionalConsentPolicies: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    components: {
      givenName: GivenName,
      familyName: FamilyName,
      organization: Organization,
      organizationTitle: OrganizationTitle,
    },
    values: { regionalConsentAnswers: [] },
  }),

  computed: {
    /**
     * Returns fields that have a matching, loopable component.
     */
    componentFields() {
      return this.fields.filter(field => this.components[field]);
    },

    /**
     *
     */
    displayCountryField() {
      return this.fields.includes('countryCode');
    },

    /**
     *
     */
    displayRegionField() {
      const { countryCode } = this.values;
      return this.fields.includes('regionCode') && regionCountryCodes.includes(countryCode);
    },

    /**
     *
     */
    displayPostalCodeField() {
      return this.fields.includes('postalCode') && this.displayRegionField;
    },

    /**
     *
     */
    regionalPolicyFields() {
      const { regionalConsentPolicies } = this;
      const { countryCode } = this.values;
      if (!regionalConsentPolicies.length || !countryCode) return [];
      return regionalConsentPolicies.filter((policy) => {
        const countryCodes = policy.countries.map(country => country.id);
        return countryCodes.includes(countryCode);
      });
    },
  },

  methods: {
    getRegionalPolicyAnswer(policyId) {
      return this.values.regionalConsentAnswers.find(a => a.id === policyId);
    },

    getRegionalPolicyAnswerValue(policyId) {
      const answer = this.getRegionalPolicyAnswer(policyId);
      if (answer) return answer.given;
      return false;
    },

    setPolicyAnswer(policyId, given) {
      const answer = this.getRegionalPolicyAnswer(policyId);
      if (answer) {
        answer.given = given;
      } else {
        this.values.regionalConsentAnswers.push({ id: policyId, given });
      }
    },
  },
};
</script>
