<template>
  <div v-if="error">
    <p>{{ error }}</p>
  </div>
  <div v-else>
    <p>Logging out...</p>
  </div>
</template>

<script>
import * as Sentry from '@sentry/browser';
import redirect from './utils/redirect';
import getReferringPage from './utils/get-referring-page';
import cookiesEnabled from './utils/cookies-enabled';
import LogoutError from './errors/logout';
import FeatureError from './errors/feature';

export default {
  props: {
    redirectTo: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    error: null,
  }),
  mounted() {
    if (cookiesEnabled()) {
      this.logout();
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
    async logout() {
      this.error = null;
      try {
        Sentry.addBreadcrumb({ category: 'auth', message: 'Logging out user' });
        const res = await this.$client('/logout');
        const data = await res.json();
        Sentry.addBreadcrumb({ category: 'auth', message: 'Logging out complete', data });
        if (!res.ok) throw new LogoutError(data.message, res.status);
        Sentry.captureMessage('LogoutSuccess');
        this.redirect();
      } catch (e) {
        Sentry.captureException(e);
        this.error = `Unable to logout: ${e.message}`;
      }
    },

    redirect() {
      const to = this.redirectTo ? this.redirectTo : getReferringPage();
      redirect(to);
    },
  },
};
</script>
