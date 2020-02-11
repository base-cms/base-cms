<template>
  <form-group>
    <form-label :for="id" :required="required">
      {{ label }}
    </form-label>
    <select
      :id="id"
      v-model="regionCode"
      :readonly="isLoading"
      :disabled="disabled"
      :required="required"
      class="custom-select"
      autocomplete="region"
    >
      <option disabled value="">
        Select state/region...
      </option>
      <option v-for="region in countryRegions" :key="region.id" :value="region.code">
        {{ region.name }}
      </option>
    </select>
    <p v-if="error">
      Unable to load regions: {{ error.message }}
    </p>
  </form-group>
</template>

<script>
import FormGroup from '../common/form-group.vue';
import FormLabel from '../common/form-label.vue';
import get from '../../utils/get';
import regionCountryCodes from '../../utils/region-country-codes';

export default {
  components: {
    FormGroup,
    FormLabel,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: 'State / Region',
    },
    value: {
      type: String,
      default: '',
    },
    countryCode: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    id: 'sign-on-region',
    isLoading: false,
    error: null,
    regions: [],
  }),
  computed: {
    regionCode: {
      get() {
        return this.value || '';
      },
      set(regionCode) {
        this.$emit('input', regionCode || null);
      },
    },
    hasValidCountryCode() {
      return regionCountryCodes.includes(this.countryCode);
    },
    countryRegions() {
      if (!this.hasValidCountryCode) return [];
      return this.regions.filter(region => region.country.id === this.countryCode);
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
        const res = await get('/regions');
        this.regions = await res.json();
      } catch (e) {
        this.error = e;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
