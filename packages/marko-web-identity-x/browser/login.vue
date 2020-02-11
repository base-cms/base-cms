<template>
  <div v-if="hasActiveUser">
    <!-- @todo determine when new fields should display -->
    <p>You are currently logged in as {{ activeUser.email }}.</p>
    <a
      :href="activeEndpoints.logout"
      class="btn btn-primary"
      role="button"
    >
      {{ activeButtonLabels.logout }}
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
      Please add noreply@identity-x.base-cms.io to your whitelist and try registering again.
    </p>
  </div>
  <div v-else>
    <form @submit.prevent="handleSubmit">
      <fieldset :disabled="loading">
        <email v-model="email" />
        <button
          type="submit"
          class="btn btn-primary"
        >
          {{ buttonLabel }}
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
import cleanPath from './utils/clean-path';
import post from './utils/post';
import cookiesEnabled from './utils/cookies-enabled';
import FormError from './errors/form';
import FeatureError from './errors/feature';

const defaults = {
  endpoints: {
    login: '/user/login',
    logout: '/user/logout',
    auth: '/user/authenticate',
    register: '/user/register',
  },
  buttonLabels: {
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
  },
};

export default {
  /**
   *
   */
  components: {
    Email,
  },

  /**
   *
   */
  props: {
    activeUser: {
      type: Object,
      default: () => {},
    },
    context: {
      type: String,
      validator: v => ['login', 'register'].includes(v),
      required: true,
    },
    endpoints: {
      type: Object,
      default: () => defaults.endpoints,
    },
    buttonLabels: {
      type: Object,
      default: () => defaults.buttonLabels,
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
  }),

  /**
   *
   */
  computed: {
    /**
     *
     */
    activeEndpoints() {
      return { ...defaults.endpoints, ...this.endpoints };
    },

    /**
     *
     */
    activeButtonLabels() {
      return { ...defaults.buttonLabels, ...this.buttonLabels };
    },

    /**
     *
     */
    authUrl() {
      return `${window.location.origin}/${cleanPath(this.activeEndpoints.auth)}`;
    },

    /**
     *
     */
    buttonLabel() {
      const { activeButtonLabels } = this;
      if (this.loading) return 'Loading...';
      if (this.isLoginContext) return activeButtonLabels.login;
      if (this.registerContext) return activeButtonLabels.register;
      return 'Submit';
    },

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
      const { activeEndpoints } = this;
      const endpoints = [activeEndpoints.login, activeEndpoints.register];
      return endpoints.includes(pathname) ? undefined : pathname;
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
      const {
        email,
        redirectTo,
        authUrl,
      } = this;
      try {
        const res = await post('/login', {
          email,
          redirectTo,
          authUrl,
        });
        const data = await res.json();
        if (!res.ok) throw new FormError(data.message, res.status);
        if (data.ok) {
          this.complete = true;
          this.$emit('submit');
        }
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
