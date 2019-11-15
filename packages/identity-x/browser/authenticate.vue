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
import redirect from './utils/redirect';
import cookiesEnabled from './utils/cookies-enabled';
import post from './utils/post';
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

        const res = await post('/authenticate', { token });
        const data = await res.json();

        if (!res.ok) throw new AuthenticationError(data.message, res.status);
        this.$emit('authenticate');
        this.redirect();
      } catch (e) {
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
