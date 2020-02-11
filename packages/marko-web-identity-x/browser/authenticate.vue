<template>
  <div v-if="isRedirecting">
    <p>You've successfully logged in. Redirecting you...</p>
  </div>
  <div v-else-if="isLoading">
    <p>Logging in...</p>
  </div>
  <div v-else-if="showProfileForm">
    <profile-form
      :endpoints="endpoints"
      :active-user="activeUser"
      :required-server-fields="requiredServerFields"
      :required-client-fields="requiredClientFields"
      @submit="redirect"
    />
  </div>
  <div v-else-if="error" class="alert alert-danger" role="alert">
    <h5 class="alert-heading">
      Unable to Login
    </h5>
    <p>{{ error.message }}</p>
    <hr>
    <p class="mb-0">
      Please try <a :href="endpoints.login" class="alert-link">logging in</a> again.
    </p>
  </div>
</template>

<script>
import redirect from './utils/redirect';
import cookiesEnabled from './utils/cookies-enabled';
import post from './utils/post';
import ProfileForm from './profile.vue';
import AuthenticationError from './errors/authentication';
import FeatureError from './errors/feature';

const isEmpty = v => v == null || v === '';

export default {
  /**
   *
   */
  components: { ProfileForm },

  /**
   *
   */
  props: {
    token: {
      type: String,
      required: true,
    },
    endpoints: {
      type: Object,
      required: true,
    },
    redirectTo: {
      type: String,
      default: '/',
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
    isRedirecting: false,
    isProfileComplete: true,
    activeUser: null,
  }),

  /**
   *
   */
  computed: {
    /**
     *
     */
    requiredFields() {
      return [...this.requiredServerFields, ...this.requiredClientFields];
    },

    /**
     *
     */
    hasRequiredFields() {
      return Boolean(this.requiredFields.length);
    },

    isUserRedirect() {
      const { redirectTo } = this;
      const { login, register } = this.endpoints;
      if (redirectTo.indexOf(login) === 0) return true;
      if (redirectTo.indexOf(register) === 0) return true;
      return false;
    },

    /**
     *
     */
    showProfileForm() {
      return !this.hasRequiredFields || (this.isUserRedirect && !this.isProfileComplete);
    },
  },

  /**
   *
   */
  mounted() {
    if (cookiesEnabled()) {
      this.authenticate();
    } else {
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
    async authenticate() {
      this.isLoading = true;
      try {
        const { token } = this;
        if (!token) throw new Error('No login token was provided.');

        const res = await post('/authenticate', { token });
        const data = await res.json();

        if (!res.ok) throw new AuthenticationError(data.message, res.status);

        this.activeUser = data.user;
        this.isProfileComplete = this.hasRequiredFields
          ? this.requiredFields.every(key => !isEmpty(this.activeUser[key]))
          : true;

        this.$emit('authenticate');
        if (!this.showProfileForm) this.redirect();
      } catch (e) {
        if (/no token was found/i.test(e.message)) {
          e.message = 'This login link has either expired or was already used.';
        }
        this.error = e;
      } finally {
        this.isLoading = false;
      }
    },

    /**
     *
     */
    redirect() {
      this.isRedirecting = true;
      const redirectTo = this.isUserRedirect ? '/' : this.redirectTo;
      redirect(redirectTo);
    },
  },
};
</script>
