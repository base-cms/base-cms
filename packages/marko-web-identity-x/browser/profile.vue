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
              v-model="user.organization"
              :required="isFieldRequired('organization')"
            />
          </div>
          <div class="col-md-6">
            <organization-title
              v-model="user.organizationTitle"
              :required="isFieldRequired('organizationTitle')"
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
import FeatureError from './errors/feature';

export default {
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

      this.isLoading = false;
    },
  },
};
</script>
