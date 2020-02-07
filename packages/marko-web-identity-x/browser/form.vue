<template>
  <div v-if="hasActiveUser">
    <p>You are currently logged in as {{ activeUser.email }}.</p>
    <a
      :href="logoutEndpoint"
      class="btn btn-primary"
      role="button"
    >
      {{ logoutButtonLabel }}
    </a>
  </div>
  <div v-else-if="complete">
    <h4>Almost Done!</h4>
    <p>
      We just sent an email to <em>{{ user.email }}</em> with your one-time login link.
      To finish logging in, open the email message and click the link within.
    </p>
    <p>
      Note: please check your spam/junk folders.
      If you do not receive this email, your firewall or ISP has likely blocked it.
      Please add noreply@identity-x.base-cms.io to your whitelist and try registering again.
    </p>
  </div>
  <div v-else-if="needsInput">
    <p>To complete this sign-on process, please fill out these remaining fields.</p>
    <form @submit.prevent="handle">
      <fieldset :disabled="loading">
        <div class="row">
          <div class="col-md-6">
            <given-name v-model="user.givenName" :required="isFieldRequired('givenName')" />
          </div>
          <div class="col-md-6">
            <family-name v-model="user.familyName" :required="isFieldRequired('familyName')" />
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <organization v-model="user.organization" :required="isFieldRequired('organization')" />
          </div>
          <div class="col-md-6">
            <organization-title
              v-model="user.organizationTitle"
              :required="isFieldRequired('organizationTitle')"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <country v-model="user.countryCode" :required="isFieldRequired('countryCode')" />
          </div>
        </div>

        <div v-if="displayRegionField || displayPostalCodeField" class="row">
          <div v-if="displayRegionField" class="col-md-6">
            <region
              v-model="user.regionCode"
              :country-code="user.countryCode"
              :required="isFieldRequired('regionCode')"
            />
          </div>
          <div v-if="displayPostalCodeField" class="col-md-6">
            <postal-code v-model="user.postalCode" :required="isFieldRequired('postalCode')" />
          </div>
        </div>

        <button
          type="submit"
          class="btn btn-primary"
        >
          {{ buttonLabel }}
        </button>
      </fieldset>
      <p v-show="error" class="mt-3 text-danger">
        An error occurred: {{ error }}
      </p>
    </form>
  </div>
  <div v-else>
    <form @submit.prevent="handle">
      <fieldset :disabled="loading">
        <email v-model="user.email" />
        <button
          type="submit"
          class="btn btn-primary"
        >
          {{ buttonLabel }}
        </button>
      </fieldset>
      <p v-show="error" class="mt-3 text-danger">
        An error occurred: {{ error }}
      </p>
    </form>
  </div>
</template>

<script>
import Email from './form/fields/email.vue';
import GivenName from './form/fields/given-name.vue';
import FamilyName from './form/fields/family-name.vue';
import Organization from './form/fields/organization.vue';
import OrganizationTitle from './form/fields/organization-title.vue';
import Country from './form/fields/country.vue';
import Region from './form/fields/region.vue';
import PostalCode from './form/fields/postal-code.vue';
import cleanPath from './utils/clean-path';
import post from './utils/post';
import cookiesEnabled from './utils/cookies-enabled';
import regionCountryCodes from './utils/region-country-codes';
import FormError from './errors/form';
import FeatureError from './errors/feature';

export default {
  /**
   *
   */
  components: {
    Email,
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
    authEndpoint: {
      type: String,
      default: '/user/authenticate',
    },
    context: {
      type: String,
      validator: v => ['login', 'register'].includes(v),
      default: '',
    },
    loginButtonLabel: {
      type: String,
      default: 'Login',
    },
    loginEndpoint: {
      type: String,
      default: '/user/login',
    },
    logoutButtonLabel: {
      type: String,
      default: 'Logout',
    },
    logoutEndpoint: {
      type: String,
      default: '/user/logout',
    },
    registerButtonLabel: {
      type: String,
      default: 'Register',
    },
    registerEndpoint: {
      type: String,
      default: '/user/register',
    },
    /**
     * Determines which user fields/data are required by the backend.
     * Will re-prompt users on login if these are missing.
     */
    requiredData: {
      type: Array,
      default: () => ['givenName', 'familyName', 'countryCode'],
    },

    /**
     * Determines which fields are required on the form (client-side).
     * The `email` field is always required.
     *
     * When generating the form, this field will also be merged with `this.requiredData`.
     *
     * The `regionCode` and `postalCode` fields will only display (and thereby be required)
     * if/when a valid `countryCode` is selected.
     */
    requiredFields: {
      type: Array,
      default: () => ['regionCode', 'postalCode'],
    },
  },

  /**
   *
   */
  data: () => ({
    complete: false,
    error: null,
    loading: false,
    needsInput: false,
    user: {
      givenName: '',
      familyName: '',
      organization: '',
      organizationTitle: '',
      countryCode: '',
      regionCode: '',
      postalCode: '',
    },
  }),

  /**
   *
   */
  computed: {
    /**
     *
     */
    authUrl() {
      return `${window.location.origin}/${cleanPath(this.authEndpoint)}`;
    },

    /**
     *
     */
    buttonLabel() {
      if (this.loading) return 'Loading...';
      if (this.needsInput) {
        if (this.isLoginContext) return this.loginButtonLabel;
        if (this.isRegisterContext) return this.registerButtonLabel;
        return 'Finish';
      }
      return 'Continue';
    },

    /**
     *
     */
    hasActiveUser() {
      return this.activeUser && this.activeUser.email;
    },

    /**
     *
     */
    isLoginContext() {
      return this.context === 'login';
    },

    /**
     *
     */
    isRegisterContext() {
      return this.context === 'register';
    },

    /**
     *
     */
    redirectTo() {
      const { pathname } = window.location;
      const endpoints = [this.loginEndpoint, this.registerEndpoint];
      return endpoints.includes(pathname) ? undefined : pathname;
    },

    /**
     *
     */
    countryCode() {
      return this.user.countryCode;
    },

    /**
     *
     */
    regionCode() {
      return this.user.regionCode;
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

    requiredClientSideFields() {
      return [...this.requiredData, ...this.requiredFields];
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
      this.user.regionCode = '';
    },
    /**
     * Clear postal code on region code change.
     */
    regionCode() {
      this.user.postalCode = '';
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
      return this.requiredClientSideFields.includes(name);
    },

    /**
     *
     */
    async handle() {
      this.error = null;
      this.loading = true;
      const {
        user,
        requiredData,
        redirectTo,
        authUrl,
      } = this;
      try {
        const res = await post('/login', {
          user,
          requiredFields: requiredData,
          redirectTo,
          authUrl,
        });
        const data = await res.json();
        if (!res.ok) throw new FormError(data.message, res.status);

        if (data.ok) {
          this.complete = true;
        } else if (data.needsInput) {
          this.user = data.appUser;
          this.needsInput = true;
        }
        this.$emit('submit');
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
