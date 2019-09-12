import Component from '@ember/component';
import { isPresent } from '@ember/utils';
import $ from 'jquery';
import { Promise } from 'rsvp';

export default Component.extend({
  classNames: ['modal'],
  classNameBindings: ['fade'],
  attributeBindings: ['role'],

  fade: true,
  show: false,
  role: 'dialog',
  size: null,

  isShowing: false,
  isShown: false,
  isHiding: false,
  isClosing: false,
  isHidden: true,
  isTransitioning: false,

  didInsertElement() {
    const $obj = this.$();
    // Set the modal options.
    this.setModalOptions($obj);
    // Replace Bootstraps native dismiss with the internal action.
    this.replaceDismiss($obj);
    // Set modal event hooks
    this.setModalHooks($obj);
    // Show the modal, if directed to.
    if (this.get('show')) this.send('show');
  },

  willDestroyElement() {
    const $obj = this.$();
    if (this.get('isShown')) {
      // The modal was closed by sending `show=false` and it's still open.
      // Remove internal events and then natively hide the modal and disposed once hidden.
      $obj.off('hidden.bs.modal')
      $obj.on('hidden.bs.modal', () => {
        this.sendEvent('onHidden');
        $obj.modal('dispose');
      });
      $obj.modal('hide');
    } else {
      $obj.modal('dispose');
    }
  },

  actions: {
    show() {
      if (this.get('isTransitioning')) return;
      this.$().modal('show');
    },

    /**
     * Fires an explicit hide action via a close button.
     * By default will set an isClosing flag, which is different than the modal being
     * hidden by other means (transition between routes, etc.)
     */
    async hide(isClosing = true) {
      const $obj = this.$();
      if (this.get('isTransitioning')) return;
      this.set('isClosing', isClosing);

      const promise = new Promise((resolve) => {
        $obj.on('hidden.bs.modal', () => {
          resolve();
        });
      });
      this.$().modal('hide');
      return promise;
    },
  },

  setModalOptions($obj) {
    const keys = ['backdrop', 'keyboard', 'focus'];
    const options = keys.reduce((opts, key) => {
      const value = this.get(key);
      if (isPresent(value)) opts[key] = value;
      return opts;
    }, { show: false });
    $obj.modal(options);
  },

  replaceDismiss($obj) {
    // Turn off Bootstrap's native dismissing of the modal (via a click from a`[data-dismiss="modal"]` element or by clicking the backdrop)
    $obj.off('click.dismiss.bs.modal');
    // Replace with the Ember hide() action.
    $obj.on('click.dismiss.bs.modal', (event) => {
      if ($(event.currentTarget).is(event.target) && true === this.get('backdrop')) {
        // Flag that the modal is explicitally being closed by the user
        this.set('isClosing', true);
        this.send('hide');
      }
    });
  },

  resetShowing() {
    this.set('isShowing', false);
    this.set('isShown', false);
  },

  resetHiding() {
    this.set('isHiding', false);
    this.set('isHidden', false);
  },

  setModalHooks($obj) {
    // This event fires immediately when the show instance method is called.
    // If caused by a click, the clicked element is available as the relatedTarget property of the event.
    $obj.on('show.bs.modal', () => {
      this.resetHiding();
      this.set('isTransitioning', true);
      this.set('isShowing', true);
      this.set('isShown', false);
      this.sendEvent('onShow');

    });

    // This event is fired when the modal has been made visible to the user (will wait for CSS transitions to complete).
    // If caused by a click, the clicked element is available as the relatedTarget property of the event.
    $obj.on('shown.bs.modal', () => {
      this.set('isShown', true);
      this.set('isShowing', false);
      this.set('isTransitioning', false);
      this.sendEvent('onShown');
    });

    // This event is fired immediately when the hide instance method has been called.
    $obj.on('hide.bs.modal', () => {
      this.resetShowing();
      this.set('isTransitioning', true);
      this.set('isHiding', true);
      this.set('isHidden', false);
      this.sendEvent('onHide');
    });

    // This event is fired when the modal has finished being hidden from the user (will wait for CSS transitions to complete).
    $obj.on('hidden.bs.modal', () => {
      this.set('isHidden', true);
      this.set('isHiding', false);
      this.set('isTransitioning', false);
      this.sendEvent('onHidden');
      // If this is an explicit close, fire the `onClose` event.
      if (this.get('isClosing')) this.sendEvent('onClose');
      if (!this.get('isDestroyed')) {
        this.set('show', false);
        this.set('isClosing', false);
      }
    });
  },

  sendEvent(name) {
    const fn = this.get(name);
    if (fn && typeof fn === 'function') return fn(this);
  },

});
