<template>
  <form-group>
    <label :for="id">{{ label }}</label>
    <select
      :id="id"
      v-model="countryCode"
      :readonly="isLoading"
      :disabled="disabled"
      :required="true"
      class="custom-select"
      autocomplete="country"
    >
      <option dsiabled value="">
        Select country...
      </option>
      <option v-for="country in countries" :key="country.id" :value="country.id">
        {{ country.name }} {{ country.flag }}
      </option>
    </select>
    <p v-if="error">
      Unable to load countries: {{ error.message }}
    </p>
  </form-group>
</template>

<script>
import FormGroup from '../common/form-group.vue';
import get from '../../utils/get';

export default {
  components: {
    FormGroup,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: 'Country',
    },
    value: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    id: 'sign-on-country',
    isLoading: false,
    error: null,
    countries: [],
  }),
  computed: {
    countryCode: {
      get() {
        return this.value;
      },
      set(countryCode) {
        this.$emit('input', countryCode);
      },
    },
  },
  created() {
    this.load();
  },
  methods: {
    async load() {
      this.error = null;
      this.isLoading = true;
      try {
        const res = await get('/countries');
        this.countries = await res.json();
      } catch (e) {
        this.error = e;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
