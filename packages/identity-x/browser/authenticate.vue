<template>
  <div v-if="redirecting">
    <p>You've successfully logged in. Redirecting you...</p>
  </div>
  <div v-else-if="loading">
    <p>Logging in...</p>
  </div>
  <div v-else-if="error">
    <p>An error occured!</p>
    <p>{{ error }}</p>
  </div>
</template>

<script>
import * as Sentry from '@sentry/browser';
import redirect from './utils/redirect';
import cookiesEnabled from './utils/cookies-enabled';
import AuthenticationError from './errors/authentication';
import FeatureError from './errors/feature';

export default {
  props: {
    token: {
      type: String,
      required: true,
    },
    redirectTo: {
      type: String,
      required: true,
      default: '/',
    },
  },
  data: () => ({
    error: null,
    loading: false,
    redirecting: false,
  }),
  mounted() {
    if (cookiesEnabled()) {
      this.authenticate();
    } else {
      const error = new FeatureError('Your browser does not support cookies. Please enable cookies to use this feature.');
      this.error = error.message;
      Sentry.captureException(error);
    }
  },
  methods: {
    /**
     *
     */
    async authenticate() {
      this.loading = true;
      try {
        const { token } = this;
        if (!token) throw new Error('No login token was provided.');

        Sentry.addBreadcrumb({ category: 'auth', message: 'Checking token', data: { token } });
        const res = await this.$client('/authenticate', { token });
        const data = await res.json();

        Sentry.addBreadcrumb({ category: 'auth', message: 'Token checked', data });
        if (!res.ok) throw new AuthenticationError(data.message, res.status);
        Sentry.captureMessage('AuthenticationSuccess');
        this.redirect();
      } catch (e) {
        Sentry.captureException(e);
        this.error = `Unable to login: ${e.message}`;
      } finally {
        this.loading = false;
      }
    },

    redirect() {
      this.redirecting = true;
      redirect(this.redirectTo);
    },
  },
};
</script>
