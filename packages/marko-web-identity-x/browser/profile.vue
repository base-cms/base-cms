<template>
  <div v-if="hasActiveUser">
    <p>{{ callToAction }}</p>
    <form @submit.prevent="handleSubmit">
      <fieldset :disabled="isLoading">
        <div class="row">
          <div class="col-md-6">
            <given-name
              v-model="activeUser.givenName"
              :required="isFieldRequired('givenName')"
            />
          </div>
          <div class="col-md-6">
            <family-name
              v-model="activeUser.familyName"
              :required="isFieldRequired('familyName')"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <organization
              v-model="activeUser.organization"
              :required="isFieldRequired('organization')"
            />
          </div>
          <div class="col-md-6">
            <organization-title
              v-model="activeUser.organizationTitle"
              :required="isFieldRequired('organizationTitle')"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <country
              v-model="activeUser.countryCode"
              :required="isFieldRequired('countryCode')"
            />
          </div>
        </div>

        <div v-if="displayRegionField || displayPostalCodeField" class="row">
          <div v-if="displayRegionField" class="col-md-6">
            <region
              v-model="activeUser.regionCode"
              :country-code="activeUser.countryCode"
              :required="isFieldRequired('regionCode')"
            />
          </div>
          <div v-if="displayPostalCodeField" class="col-md-6">
            <postal-code
              v-model="activeUser.postalCode"
              :required="isFieldRequired('postalCode')"
            />
          </div>
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </fieldset>
      <p v-if="error" class="mt-3 text-danger">
        An error occurred: {{ error }}
      </p>
    </form>
  </div>
  <div v-else>
    <p>You must be logged-in.</p>
  </div>
</template>

<script>
import cookiesEnabled from './utils/cookies-enabled';
import regionCountryCodes from './utils/region-country-codes';
import FeatureError from './errors/feature';
import GivenName from './form/fields/given-name.vue';
import FamilyName from './form/fields/family-name.vue';
import Organization from './form/fields/organization.vue';
import OrganizationTitle from './form/fields/organization-title.vue';
import Country from './form/fields/country.vue';
import Region from './form/fields/region.vue';
import PostalCode from './form/fields/postal-code.vue';

export default {
  components: {
    GivenName,
    FamilyName,
    Organization,
    OrganizationTitle,
    Country,
    Region,
    PostalCode,
  },

  /**
   *
   */
  props: {
    activeUser: {
      type: Object,
      default: () => {},
    },
    callToAction: {
      type: String,
      default: 'To complete your profile, please fill out the required fields.',
    },
    requiredServerFields: {
      type: Array,
      default: () => [],
    },
    requiredClientFields: {
      type: Array,
      default: () => [],
    },
  },

  /**
   *
   */
  data: () => ({
    error: null,
    isLoading: false,
  }),

  /**
   *
   */
  computed: {
    /**
     *
     */
    hasActiveUser() {
      return this.activeUser && this.activeUser.email;
    },

    /**
     *
     */
    requiredFields() {
      return [...this.requiredServerFields, ...this.requiredClientFields];
    },

    /**
     *
     */
    countryCode() {
      return this.activeUser.countryCode;
    },

    /**
     *
     */
    displayRegionField() {
      return regionCountryCodes.includes(this.countryCode);
    },

    /**
     *
     */
    displayPostalCodeField() {
      return this.displayRegionField;
    },
  },

  /**
   *
   */
  watch: {
    /**
     * Clear region code on country code change.
     */
    countryCode() {
      this.user.regionCode = null;
    },
  },


  /**
   *
   */
  mounted() {
    if (!cookiesEnabled()) {
      const error = new FeatureError('Your browser does not support cookies. Please enable cookies to use this feature.');
      this.error = error.message;
    }
  },

  /**
   *
   */
  methods: {
    /**
     *
     */
    isFieldRequired(name) {
      return this.requiredFields.includes(name);
    },

    /**
     *
     */
    async handleSubmit() {
      this.error = null;
      this.isLoading = true;

      alert('Do submit!');

      this.$emit('submit');

      this.isLoading = false;
    },
  },
};
</script>
