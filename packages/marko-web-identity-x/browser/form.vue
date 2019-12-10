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
        <given-name v-model="user.givenName" />
        <family-name v-model="user.familyName" />
        <button
          type="submit"
          class="btn btn-primary"
        >
          {{ buttonLabel }}
        </button>
      </fieldset>
      <p v-show="error">
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
      <p v-show="error">
        An error occurred: {{ error }}
      </p>
    </form>
  </div>
</template>

<script>
import Email from './form/fields/email.vue';
import GivenName from './form/fields/given-name.vue';
import FamilyName from './form/fields/family-name.vue';
import cleanPath from './utils/clean-path';
import post from './utils/post';
import cookiesEnabled from './utils/cookies-enabled';
import FormError from './errors/form';
import FeatureError from './errors/feature';

export default {
  components: {
    Email,
    GivenName,
    FamilyName,
  },
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
    requiredFields: {
      type: Array,
      default: () => ['givenName', 'familyName'],
    },
  },
  data: () => ({
    complete: false,
    error: null,
    loading: false,
    needsInput: false,
    user: {},
  }),
  computed: {
    authUrl() {
      return `${window.location.origin}/${cleanPath(this.authEndpoint)}`;
    },
    buttonLabel() {
      if (this.loading) return 'Loading...';
      if (this.needsInput) {
        if (this.isLoginContext) return this.loginButtonLabel;
        if (this.isRegisterContext) return this.registerButtonLabel;
        return 'Finish';
      }
      return 'Continue';
    },
    hasActiveUser() {
      return this.activeUser && this.activeUser.email;
    },
    isLoginContext() {
      return this.context === 'login';
    },
    isRegisterContext() {
      return this.context === 'register';
    },
    redirectTo() {
      const { pathname } = window.location;
      const endpoints = [this.loginEndpoint, this.registerEndpoint];
      return endpoints.includes(pathname) ? undefined : pathname;
    },
  },
  mounted() {
    if (!cookiesEnabled()) {
      const error = new FeatureError('Your browser does not support cookies. Please enable cookies to use this feature.');
      this.error = error.message;
    }
  },
  methods: {
    async handle() {
      this.error = null;
      this.loading = true;
      const {
        user,
        requiredFields,
        redirectTo,
        authUrl,
      } = this;
      try {
        const res = await post('/login', {
          user,
          requiredFields,
          redirectTo,
          authUrl,
        });
        const data = await res.json();
        if (!res.ok) throw new FormError(data.message, res.status);

        if (data.ok) {
          this.complete = true;
        } else if (data.needsInput) {
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
