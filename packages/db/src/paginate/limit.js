const { assign } = Object;

class Limit {
  /**
   * Contructor.
   *
   * @param {object} params
   * @param {number} params.value The number of documents to limit by.
   * @param {object} params.options The limit options.
   */
  constructor({ value, options }) {
    this.options = options;
    this.value = value;
  }

  /**
   * Sets the limit options.
   *
   * @param {object} [options={}]
   * @param {number} [options.def=10] The default limit value, if not specified.
   * @param {number} [options.max=500] The maximum limit (page size).
   */
  set options({ def = 10, max = 500 } = {}) {
    this.opts = { def, max };
  }

  /**
   * Gets the options.
   * Will clone the object, so changing the returning values
   * will not effect the internal options.
   *
   * @return {object}
   */
  get options() {
    return assign({}, this.opts);
  }

  /**
   * Sets the limit value (page size).
   * If greater than the configured max value, will set the max value.
   *
   * @param {number} value
   */
  set value(value) {
    const { def, max } = this.opts;
    const v = parseInt(value, 10);
    if (v === 0) {
      this.v = 0;
    } else if (!v || value < 0) {
      this.v = def;
    } else if (v > max) {
      this.v = max;
    } else {
      this.v = v;
    }
  }

  /**
   * Gets the limit value (page size).
   *
   * @return {number}
   */
  get value() {
    return this.v;
  }
}

module.exports = Limit;
