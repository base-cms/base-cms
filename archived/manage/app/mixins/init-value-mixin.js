import Mixin from '@ember/object/mixin';
import { isArray } from '@ember/array';
import { isPresent } from '@ember/utils';

export default Mixin.create({
  /**
   * Initializes a value.
   *
   * @param {string} prop The property to initalize
   * @param {*} toSet The value to set when not the prop is not present.
   */
  initValue(prop, toSet) {
    const value = this.get(prop);
    if (isArray(toSet) && !isArray(value)) {
      // Force the value to an array.
      this.set(prop, toSet);
      return;
    }
    // When present, do nothing.
    if (isPresent(value)) return;

    // Set the default value;
    this.set(prop, toSet);
  },
});