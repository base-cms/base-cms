<template>
  <div v-if="hasActiveUser">
    <p>You are currently logged in as {{ activeUser.email }}.</p>
    <a
      :href="endpoints.logout"
      class="btn btn-primary"
      role="button"
    >
      {{ buttonLabels.logout }}
    </a>
  </div>
  <div v-else-if="complete">
    <h4>Almost Done!</h4>
    <p>
      We just sent an email to <em>{{ email }}</em> with your one-time login link.
      To finish logging in, open the email message and click the link within.
    </p>
    <p>
      Note: please check your spam/junk folders.
      If you do not receive this email, your firewall or ISP has likely blocked it.
      Please add noreply@identity-x.io to your whitelist and try registering again.
    </p>
  </div>
  <div v-else-if="missingRequiredFields.length">
    <login-fields
      :fields="missingRequiredFields"
      :button-label="buttonLabels.submit"
      :consent-policy="consentPolicy"
      @submit="handleLoginFields"
    />
  </div>
  <div v-else>
    <form @submit.prevent="handleSubmit">
      <fieldset :disabled="loading">
        <email v-model="email" />
        <small
          v-if="consentPolicy"
          class="text-muted mb-3"
          v-html="consentPolicy"
        />
        <button
          type="submit"
          class="btn btn-primary"
        >
          {{ buttonLabels.continue }}
        </button>
      </fieldset>
      <p v-if="error" class="mt-3 text-danger">
        An error occurred: {{ error.message }}
      </p>
    </form>
  </div>
</template>

<script>
import Email from './form/fields/email.vue';
import LoginFields from './login-fields.vue';

import cleanPath from './utils/clean-path';
import post from './utils/post';
import cookiesEnabled from './utils/cookies-enabled';
import FormError from './errors/form';
import FeatureError from './errors/feature';

export default {
  /**
   *
   */
  components: {
    Email,
    LoginFields,
  },

  /**
   *
   */
  props: {
    activeUser: {
      type: Object,
      default: () => {},
    },
    endpoints: {
      type: Object,
      required: true,
    },
    buttonLabels: {
      type: Object,
      default: () => ({
        continue: 'Continue',
        submit: 'Login / Register',
        logout: 'Logout',
      }),
    },
    consentPolicy: {
      type: String,
      default: null,
    },
    redirect: {
      type: String,
      default: null,
    },
    appContextId: {
      type: String,
      default: null,
    },

    /**
     * User fields that are required before allowing a login.
     * If the user is missing any of these fields, they will be prompted to complete
     * them before the login link is sent.
     *
     * This is an array of user field keys, e.g.
     * [
     *   'countryCode',
     *   'regionCode',
     * ]
     *
     */
    requiredFields: {
      type: Array,
      default: () => [],
    },
  },

  /**
   *
   */
  data: () => ({
    email: null,
    complete: false,
    error: null,
    loading: false,
    missingRequiredFields: [],
  }),

  /**
   *
   */
  computed: {
    /**
     *
     */
    authUrl() {
      return `${window.location.origin}/${cleanPath(this.endpoints.authenticate)}`;
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
    redirectTo() {
      const { redirect } = this;
      if (redirect) return redirect;
      const { pathname, search, hash } = window.location;
      return `${pathname}${search}${hash}`;
    },
  },

  /**
   *
   */
  mounted() {
    if (!cookiesEnabled()) {
      this.error = new FeatureError('Your browser does not support cookies. Please enable cookies to use this feature.');
    }
  },

  /**
   *
   */
  methods: {
    /**
     *
     */
    async handleSubmit() {
      this.error = null;
      this.loading = true;
      try {
        const res = await post('/login', {
          email: this.email,
          redirectTo: this.redirectTo,
          authUrl: this.authUrl,
          appContextId: this.appContextId,
          requiredFields: this.requiredFields,
        });
        const data = await res.json();
        if (!res.ok) throw new FormError(data.message, res.status);
        if (!data.hasRequiredFields) {
          this.missingRequiredFields = data.requiredFields;
        } else if (data.ok) {
          this.complete = true;
          this.$emit('submit');
        }
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    },

    /**
     *
     */
    handleLoginFields(values) {
      console.log(values);
    },
  },
};
</script>
