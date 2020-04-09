<template>
  <form v-if="incomplete" @submit.prevent="submit">
    <input type="hidden" name="contentId" :value="contentId">
    <input type="hidden" name="contentType" :value="contentType">
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input
            id="firstName"
            v-model="firstName"
            name="firstName"
            type="text"
            class="form-control"
            required
          >
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input
            id="lastName"
            v-model="lastName"
            name="lastName"
            type="text"
            class="form-control"
            required
          >
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            id="email"
            v-model="email"
            name="email"
            type="email"
            class="form-control"
            required
          >
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input
            id="phone"
            v-model="phone"
            name="phone"
            type="text"
            class="form-control"
          >
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label for="company">Company Name</label>
          <input
            id="company"
            v-model="company"
            name="company"
            type="text"
            class="form-control"
          >
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label for="jobTitle">Job Title</label>
          <input
            id="jobTitle"
            v-model="jobTitle"
            name="jobTitle"
            type="text"
            class="form-control"
            required
          >
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <country-field v-model="country" />
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label for="postalCode">ZIP/Postal Code</label>
          <input
            id="postalCode"
            v-model="postalCode"
            name="postalCode"
            type="text"
            class="form-control"
          >
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="form-group">
          <label for="comments">Comments</label>
          <textarea
            id="comments"
            v-model="comments"
            name="comments"
            class="form-control"
          />
        </div>
      </div>
    </div>
    <pre v-if="error" class="alert alert-danger text-danger">An error occurred: {{ error }}</pre>
    <button type="submit" class="btn btn-primary" :disabled="loading">
      Submit
    </button>
  </form>
  <div v-else>
    Thanks for your inquiry! We'll reach out shortly.
  </div>
</template>

<script>
import FormMixin from './form-mixin';
import CountryField from './fields/country.vue';

export default {
  components: { CountryField },
  mixins: [
    FormMixin,
  ],
  data: () => ({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    country: '',
    postalCode: '',
    comments: '',
  }),
  methods: {
    async submit() {
      const {
        firstName,
        lastName,
        email,
        phone,
        company,
        jobTitle,
        country,
        postalCode,
        comments,
      } = this;
      await this.$submit({
        firstName,
        lastName,
        email,
        confirmationEmail: email,
        phone,
        company,
        jobTitle,
        country,
        postalCode,
        comments,
      });
    },
  },
};
</script>
