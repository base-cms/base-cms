import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';

export default Component.extend({
  tagName: 'small',
  classNames: ['d-flex'],

  /**
   * The content created date.
   *
   * @type {Date}
   */
  created: null,

  /**
   * The content updated date.
   *
   * @type {Date}
   */
  updated: null,

  /**
   * The updated by username.
   *
   * @type {string}
   */
  updatedBy: null,


  /**
   * The created by username.
   *
   * @type {string}
   */
  createdBy: null,

  /**
   * The date format.
   *
   * @type {string}
   */
  dateFormat: 'MMM Do, YYYY h:mma',

  /**
   * The selected attribution key.
   * One of `updated` or `created`
   *
   * @type {string}
   */
  selected: 'updated',

  /**
   * Whether the `fromNow` value is displayed.
   */
  showFromNow: true,

  /**
   * Determines which user property to use.
   */
  selectedUserProp: computed('selected', function() {
    return `${this.get('selected')}By`;
  }).readOnly(),

  /**
   * Determines the label to display, e.g. `Updated`.
   */
  label: computed('selected', function() {
    const selected = this.get('selected');
    return selected.charAt(0).toUpperCase() + selected.slice(1);
  }).readOnly(),

  /**
   * Determines whether the component should display any text.
   */
  show: computed('fromNow', 'username', function() {
    const { fromNow, username } = this.getProperties('fromNow', 'username');
    if (fromNow || username) return true;
    return false;
  }).readOnly(),

  /**
   * Gets the selected username.
   */
  username: computed('selectedUserProp', 'createdBy', 'updatedBy', function() {
    const selectedUserProp = this.get('selectedUserProp');
    return this.get(selectedUserProp);
  }),

  /**
   * Gets the selected from now value.
   *
   * @returns {string}
   */
  fromNow: computed('selected', 'created', 'updated', function() {
    const value = this.get(this.get('selected'));
    if (!value) return null;
    const date = moment(value);
    if (!date.isValid()) return null;
    return date.fromNow();
  }).readOnly(),

  /**
   * Gets the formatted selected date.
   *
   * @returns {string}
   */
  formattedDate: computed('selected', 'created', 'updated', function() {
    const value = this.get(this.get('selected'));
    if (!value) return null;
    const date = moment(value);
    if (!date.isValid()) return null;
    return date.format(this.get('dateFormat'));
  }).readOnly(),

  dateDisplay: computed('showFromNow', 'fromNow', 'formattedDate', function() {
    const showFromNow = this.get('showFromNow');
    const fromNow = this.get('fromNow');
    const formattedDate = this.get('formattedDate');
    if (showFromNow) {
      return { title: formattedDate, value: fromNow };
    }
    return { title: fromNow, value: formattedDate };
  }).readOnly(),

  init() {
    this._super(...arguments);
    if (!this.get('selected')) {
      this.set('selected', '');
    }
  },

  actions: {
    toggleDates() {
      this.toggleProperty('showFromNow');
    },
  },
});
