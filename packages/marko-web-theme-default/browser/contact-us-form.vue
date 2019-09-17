<template>
  <div :class="bem('container')">
    <div :class="bem('header')">
      {{ title }}
    </div>
    <form
      :class="bem('contents')"
      @submit.prevent="verify"
    >
      <div :class="bem('row')">
        <label
          :class="bem('label')"
          for="cuf__name"
        >
          Name
        </label>
        <input
          id="cuf__name"
          v-model="name"
          :class="[...bem('field'), 'form-control']"
          type="text"
          name="name"
          required
        >
      </div>
      <div :class="bem('row')">
        <label
          :class="bem('label')"
          for="cuf__phone"
        >
          Phone
        </label>
        <input
          id="cuf__phone"
          v-model="phone"
          :class="[...bem('field'), 'form-control']"
          type="text"
          name="phone"
          required
        >
      </div>
      <div :class="bem('row')">
        <label
          :class="bem('label')"
          for="cuf__email"
        >
          Email
        </label>
        <input
          id="cuf__email"
          v-model="email"
          :class="[...bem('field'), 'form-control']"
          type="email"
          name="email"
          required
        >
      </div>
      <div :class="bem('row')">
        <label
          :class="bem('label')"
          for="cuf__comments"
        >
          Comments
        </label>
        <textarea
          id="cuf__comments"
          v-model="comments"
          :class="[...bem('field'), 'form-control']"
          name="comments"
          required
        />
      </div>
      <hr>
      <div :class="bem('row')">
        <p
          v-if="submitted"
          :class="bem('text', ['success'])"
        >
          Thanks! Your comments have been received.
        </p>
        <p
          v-else-if="loading"
          :class="bem('text', ['loading'])"
        >
          Hold up, we're processing your submission...
        </p>
        <p
          v-else-if="error"
          :class="bem('text', ['danger'])"
        >
          Oh snap! There was a problem with your submission: {{ error }}
        </p>
        <vue-recaptcha
          v-if="!submitted"
          ref="recaptcha"
          :sitekey="sitekey"
          @verify="onVerify"
          @expired="onExpired"
        >
          <button
            type="submit"
            :class="bem('submit')"
            :disabled="disabled"
          >
            Submit
          </button>
        </vue-recaptcha>
      </div>
    </form>
  </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';

const block = 'contact-us-form';

export default {
  components: { VueRecaptcha },
  props: {
    title: {
      type: String,
      default: 'Drop us a line!',
    },
    sitekey: {
      type: String,
      default: '6LeZOaIUAAAAANDsX4PCYCYQeYfqdoabuev5chYk',
    },
  },
  data: () => ({
    name: null,
    phone: null,
    email: null,
    comments: null,
    error: null,
    loading: false,
    submitted: false,
  }),
  computed: {
    disabled() {
      return !(this.name && this.phone && this.email && this.comments && !this.loading);
    },
  },
  methods: {
    bem: (name, mod = []) => [block, `${block}__${name}`, ...mod.map(m => `${block}__${name}--${m}`)],
    onExpired() {
      this.error = 'Timed out validating your submission.';
      this.loading = false;
    },
    async onVerify(token) {
      this.loading = true;
      this.error = null;
      if (token) {
        // eslint-disable-next-line no-underscore-dangle
        const payload = { ...this._data, token };
        try {
          const res = await fetch('/contact-us', {
            method: 'post',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' },
          });
          if (res.ok) {
            this.submitted = true;
          } else {
            throw new Error(res.statusText);
          }
        } catch (e) {
          this.error = e.message;
        } finally {
          this.loading = false;
        }
      } else {
        this.error = 'Unable to submit your request. Please try again!';
        this.loading = false;
      }
    },
  },
};
</script>
