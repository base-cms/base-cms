export default {
  props: {
    mountPoint: {
      type: String,
      default: '/__inquiry',
    },
    contentId: {
      type: Number,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    complete: false,
    error: null,
    loading: false,
  }),
  computed: {
    incomplete() {
      return !this.complete;
    },
  },
  methods: {
    async fetch(path, body) {
      const endpoint = path.replace(/^\/+/, '');
      const uri = `${this.mountPoint}/${endpoint}`;
      return fetch(uri, {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
      });
    },
    async $submit(payload) {
      this.error = null;
      this.loading = true;
      try {
        const res = await this.fetch(`/${this.contentId}`, payload);
        const data = await res.json();
        if (!res.ok) throw new Error(`${res.statusText} (${res.status}): ${data.message}`);
        if (data.ok) this.complete = true;
      } catch (e) {
        this.error = e.message;
        throw e;
      } finally {
        this.loading = false;
      }
    },
  },

};
