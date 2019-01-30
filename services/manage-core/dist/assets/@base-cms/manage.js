'use strict';



;define("@base-cms/manage/app", ["exports", "@base-cms/manage/resolver", "ember-load-initializers", "@base-cms/manage/config/environment"], function (_exports, _resolver, _emberLoadInitializers, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });
  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);
  var _default = App;
  _exports.default = _default;
});
;define("@base-cms/manage/components/bs-modal", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    to: 'bootstrap-modals',
    backdrop: true,
    fade: true,
    show: false,
    keyboard: true,
    focus: true,
    size: null,
    contentClass: null,
    dislogClass: null
  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/bs-modal/body", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    classNames: ['modal-body']
  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/bs-modal/dialog", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    classNames: ['modal-dialog'],
    classNameBindings: ['_sizeClass'],
    attributeBindings: ['role'],
    role: 'document',
    size: null,
    _sizeClass: Ember.computed('size', function () {
      switch (this.get('size')) {
        case 'small':
          return 'modal-sm';

        case 'large':
          return 'modal-lg';

        case 'xl':
          return 'modal-xl';

        default:
          return null;
      }
    })
  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/bs-modal/footer", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    classNames: ['modal-footer']
  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/bs-modal/header", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    classNames: ['modal-header'],
    title: null,
    showClose: true,
    titleComponent: 'bs-modal/title',
    closeComponent: 'bs-modal/close-icon'
  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/bs-modal/wrapper", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
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
      const $obj = this.$(); // Set the modal options.

      this.setModalOptions($obj); // Replace Bootstraps native dismiss with the internal action.

      this.replaceDismiss($obj); // Set modal event hooks

      this.setModalHooks($obj); // Show the modal, if directed to.

      if (this.get('show')) this.send('show');
    },

    willDestroyElement() {
      const $obj = this.$();

      if (this.get('isShown')) {
        // The modal was closed by sending `show=false` and it's still open.
        // Remove internal events and then natively hide the modal and disposed once hidden.
        $obj.off('hidden.bs.modal');
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
       * Will set an isClosing flag, which is different than the modal being
       * hidden by other means (transition between routes, etc.)
       */
      hide() {
        if (this.get('isTransitioning')) return;
        this.set('isClosing', true);
        this.$().modal('hide');
      }

    },

    setModalOptions($obj) {
      const keys = ['backdrop', 'keyboard', 'focus'];
      const options = keys.reduce((opts, key) => {
        const value = this.get(key);
        if (Ember.isPresent(value)) opts[key] = value;
        return opts;
      }, {
        show: false
      });
      $obj.modal(options);
    },

    replaceDismiss($obj) {
      // Turn off Bootstrap's native dismissing of the modal (via a click from a`[data-dismiss="modal"]` element or by clicking the backdrop)
      $obj.off('click.dismiss.bs.modal'); // Replace with the Ember hide() action.

      $obj.on('click.dismiss.bs.modal', event => {
        if (Ember.$(event.currentTarget).is(event.target) && true === this.get('backdrop')) {
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
      }); // This event is fired when the modal has been made visible to the user (will wait for CSS transitions to complete).
      // If caused by a click, the clicked element is available as the relatedTarget property of the event.

      $obj.on('shown.bs.modal', () => {
        this.set('isShown', true);
        this.set('isShowing', false);
        this.set('isTransitioning', false);
        this.sendEvent('onShown');
      }); // This event is fired immediately when the hide instance method has been called.

      $obj.on('hide.bs.modal', () => {
        this.resetShowing();
        this.set('isTransitioning', true);
        this.set('isHiding', true);
        this.set('isHidden', false);
        this.sendEvent('onHide');
      }); // This event is fired when the modal has finished being hidden from the user (will wait for CSS transitions to complete).

      $obj.on('hidden.bs.modal', () => {
        this.set('isHidden', true);
        this.set('isHiding', false);
        this.set('isTransitioning', false);
        this.sendEvent('onHidden'); // If this is an explicit close, fire the `onClose` event.

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
    }

  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/btn-scroll-top", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    tagName: 'button',
    classNames: ['btn', 'btn-scroll-top', 'px-3', 'animated'],
    attributeBindings: ['type', 'title', 'style'],
    type: 'button',
    title: 'Scroll To Top',
    style: Ember.computed('show', function () {
      const style = this.get('show') ? '' : 'display: none;';
      return Ember.String.htmlSafe(style);
    }).readOnly(),
    show: false,
    offset: 300,

    click() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      this.element.blur();
    },

    handleScroll() {
      Ember.run.debounce(this, 'scroll', 150);
    },

    scroll() {
      const {
        element
      } = this;
      const {
        scrollY,
        pageYOffset
      } = window;
      const y = scrollY || pageYOffset;
      const offset = this.get('offset');
      element.classList.remove('fadeIn', 'fadeOut');

      if (y > offset) {
        element.classList.add('fadeIn');
        this.set('show', true);
      } else {
        element.classList.add('fadeOut');
      }
    },

    didInsertElement() {
      const handle = this.handleScroll.bind(this);
      window.addEventListener('scroll', handle);
      document.addEventListener('touchmove', handle);
    },

    willDestroyElement() {
      const handle = this.handleScroll.bind(this);
      window.removeEventListener('scroll', handle);
      document.removeEventListener('touchmove', handle);
    }

  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/content-card", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    classNames: ['mb-5', 'col-12', 'col-sm-6', 'col-lg-4', 'col-xl-3'],

    /**
     * Determines the user attribution type to display.
     */
    attributionType: 'updated',

    /**
     * @todo This is contrived. Update to support HTML and words.
     */
    teaserTruncated: Ember.computed('content.teaser', function () {
      const teaser = this.get('content.teaser');
      if (!teaser) return '';
      if (teaser.length > 100) return `${teaser.slice(0, 100)}...`;
      return teaser;
    }),
    isQueued: Ember.computed('contentQueue', function () {
      const queue = this.get('contentQueue');
      return queue.includes(this.get('content.id'));
    }),
    actions: {
      emitQueueChange(event) {
        const {
          checked
        } = event.target;
        const id = this.get('content.id');
        this.get('onQueueChange')(id, checked);
      }

    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/content-card/image-cap", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    classNames: ['embed-responsive embed-responsive-16by9'],
    contentId: null,
    name: null,
    statusText: null,
    type: null,
    image: null,

    /**
     * @todo This is contrived. Base should provide whether the image is a logo.
     */
    isLogo: Ember.computed('type', function () {
      return this.get('type') === 'Company';
    })
  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/content-card/image-overlay", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    classNames: ['card-img-overlay'],
    status: null,
    type: null
  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/content-card/image-placeholder", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    classNames: ['bg-gradient-gray-dark', 'w-100', 'h-100', 'd-flex', 'align-items-center', 'justify-content-center'],
    icon: 'image'
  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/content-card/image", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    tagName: '',
    src: null,
    alt: null,
    title: null,
    isLogo: false,

    init() {
      this._super(...arguments);

      if (!this.get('focalpoint')) {
        this.set('focalpoint', {
          x: 0.5,
          y: 0.5
        });
      }
    }

  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/content-card/user-attribution", ["exports", "moment"], function (_exports, _moment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
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
    selectedUserProp: Ember.computed('selected', function () {
      return `${this.get('selected')}By`;
    }).readOnly(),

    /**
     * Determines the label to display, e.g. `Updated`.
     */
    label: Ember.computed('selected', function () {
      const selected = this.get('selected');
      return selected.charAt(0).toUpperCase() + selected.slice(1);
    }).readOnly(),

    /**
     * Determines whether the component should display any text.
     */
    show: Ember.computed('fromNow', 'username', function () {
      const {
        fromNow,
        username
      } = this.getProperties('fromNow', 'username');
      if (fromNow || username) return true;
      return false;
    }).readOnly(),

    /**
     * Gets the selected username.
     */
    username: Ember.computed('selectedUserProp', 'createdBy', 'updatedBy', function () {
      const selectedUserProp = this.get('selectedUserProp');
      return this.get(selectedUserProp);
    }),

    /**
     * Gets the selected from now value.
     *
     * @returns {string}
     */
    fromNow: Ember.computed('selected', 'created', 'updated', function () {
      const value = this.get(this.get('selected'));
      if (!value) return null;
      const date = (0, _moment.default)(value);
      if (!date.isValid()) return null;
      return date.fromNow();
    }).readOnly(),

    /**
     * Gets the formatted selected date.
     *
     * @returns {string}
     */
    formattedDate: Ember.computed('selected', 'created', 'updated', function () {
      const value = this.get(this.get('selected'));
      if (!value) return null;
      const date = (0, _moment.default)(value);
      if (!date.isValid()) return null;
      return date.format(this.get('dateFormat'));
    }).readOnly(),
    dateDisplay: Ember.computed('showFromNow', 'fromNow', 'formattedDate', function () {
      const showFromNow = this.get('showFromNow');
      const fromNow = this.get('fromNow');
      const formattedDate = this.get('formattedDate');

      if (showFromNow) {
        return {
          title: formattedDate,
          value: fromNow
        };
      }

      return {
        title: fromNow,
        value: formattedDate
      };
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
      }

    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/content/browse/left-menu", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    globalEvents: Ember.inject.service(),
    tagName: 'aside',
    classNames: ['left-menu'],
    classNameBindings: ['open'],
    activeTabKey: null,
    open: Ember.computed('activeTabKey', function () {
      if (this.get('activeTabKey')) return true;
      return false;
    }).readOnly(),
    activeTab: Ember.computed('activeTabKey', function () {
      const key = this.get('activeTabKey');
      if (!key) return {};
      return this.get('tabs').find(tab => tab.key === key) || {};
    }).readOnly(),

    init() {
      this._super(...arguments);

      this.set('tabs', [{
        key: 'content-types',
        title: 'Content Types',
        icon: 'list'
      }, {
        key: 'status',
        title: 'Status',
        icon: 'light-bulb'
      }, {
        key: 'scheduling',
        title: 'Scheduling',
        icon: 'pin'
      }, {
        key: 'taxonomy',
        title: 'Taxonomy',
        icon: 'price-tag'
      }, {
        key: 'dates',
        title: 'Dates',
        icon: 'calendar'
      }]);
    },

    didInsertElement() {
      const events = this.get('globalEvents');
      const handleEscapeKey = this.handleEscapeKey.bind(this);
      events.addListener('keyup', handleEscapeKey);
      this.set('removeListener', () => events.removeListener('keyup', handleEscapeKey));
    },

    willDestroyElement() {
      this.get('removeListener')();
    },

    handleEscapeKey(event) {
      if (event.which === 27 && this.get('open')) {
        this.send('close');
      }
    },

    actions: {
      setActiveTabKey(key) {
        const {
          open,
          activeTabKey
        } = this.getProperties('open', 'activeTabKey');

        if (open && activeTabKey === key) {
          this.send('close');
        } else {
          this.set('activeTabKey', key);
        }
      },

      close() {
        this.set('activeTabKey', null);
      }

    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/content/browse/left-menu/button", ["exports", "@base-cms/manage/mixins/send-event-mixin"], function (_exports, _sendEventMixin) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend(_sendEventMixin.default, {
    tagName: 'button',
    classNames: ['btn', 'tab-btn'],
    classNameBindings: ['active'],
    attributeBindings: ['type', 'title'],
    type: 'button',
    active: Ember.computed('for', 'activeTab', function () {
      return this.get('for') === this.get('activeTab');
    }).readOnly(),
    title: null,
    for: '',
    activeTab: null,

    click() {
      this.sendEvent('on-click', this.get('for'));
      this.element.blur();
    }

  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/content/browse/left-menu/tab-content", ["exports", "@base-cms/manage/mixins/send-event-mixin"], function (_exports, _sendEventMixin) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend(_sendEventMixin.default, {
    classNames: ['tab-content'],
    classNameBindings: ['active'],
    active: Ember.computed('tab.key', 'activeTabKey', function () {
      return this.get('tab.key') === this.get('activeTabKey');
    }).readOnly(),
    activeTabKey: '',
    tab: null,
    actions: {
      close() {
        this.sendEvent('on-close');
      }

    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/content/browse/left-menu/tab-content/content-types", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    clearDisabled: Ember.computed('selected.length', function () {
      if (this.get('selected.length')) return false;
      return true;
    })
  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/content/browse/left-menu/tab-content/content-types/button", ["exports", "@base-cms/manage/mixins/send-event-mixin"], function (_exports, _sendEventMixin) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend(_sendEventMixin.default, {
    tagName: 'a',
    classNames: ['list-group-item', 'list-group-item-action', 'd-flex', 'justify-content-between', 'align-items-center'],
    classNameBindings: ['active'],
    attributeBindings: ['role', 'href'],
    href: Ember.computed(function () {
      return '#';
    }).readOnly(),
    role: Ember.computed(function () {
      return 'button';
    }).readOnly(),
    active: Ember.computed('key', 'selected.[]', function () {
      return this.get('selected').includes(this.get('key'));
    }),
    key: null,
    name: null,
    count: 0,

    click(event) {
      event.preventDefault();
      this.sendEvent('on-click', this.get('key'));
      this.element.blur();
    }

  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/content/browse/left-menu/tab-content/dates", ["exports", "moment"], function (_exports, _moment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    center: null,
    range: null,

    init() {
      this._super(...arguments);

      this.set('range', {
        start: null,
        end: null
      });
      const start = this.get('range.start');
      this.set('center', start || (0, _moment.default)());
    },

    actions: {
      setRange(range) {
        this.set('range', range); // const { start, end } = range;
        // this.get('on-range-change')({
        //   start: start ? start.startOf('day').valueOf() : null,
        //   end: end ? end.endOf('day').valueOf() : null,
        // });
        // this.set('range.start', start ? start.startOf('day').valueOf() : null);
        // this.set('range.end', end ? end.endOf('day').valueOf() : null);
      }

    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/content/browse/left-menu/tab-content/scheduling", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({});

  _exports.default = _default;
});
;define("@base-cms/manage/components/content/browse/left-menu/tab-content/status", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({});

  _exports.default = _default;
});
;define("@base-cms/manage/components/content/browse/left-menu/tab-content/taxonomy", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({});

  _exports.default = _default;
});
;define("@base-cms/manage/components/content/create-btn", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    tagName: '',
    icon: 'squared-plus'
  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/content/edit-link", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    tagName: '',
    contentId: null,
    type: null,
    dasherizedType: Ember.computed('type', function () {
      return this.get('type').replace(' ', '-').toLowerCase();
    })
  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/content/queue-btn", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    classNames: ['btn-group', 'dropup', 'btn-content-queue', 'animated'],
    attributeBindings: ['style'],
    count: 0,
    visible: false,
    showAnimation: 'bounceInUp',
    hideAnimation: 'bounceOutDown',
    style: Ember.computed('visible', function () {
      const style = this.get('visible') ? '' : 'display: none;';
      return Ember.String.htmlSafe(style);
    }).readOnly(),
    onCountChange: Ember.observer('count', function () {
      this.set('shouldShow', this.get('count') > 0);
    }),
    onShowChange: Ember.observer('shouldShow', function () {
      if (this.get('shouldShow')) {
        this.doShow();
      } else {
        this.doHide();
      }
    }),

    doShow() {
      this.element.classList.remove(this.get('hideAnimation'), 'closing');
      this.element.classList.add(this.get('showAnimation'));
      this.set('visible', true);
    },

    doHide() {
      this.element.classList.remove(this.get('showAnimation'));
      this.element.classList.add(this.get('hideAnimation'), 'closing');
    },

    didInsertElement() {
      const {
        element
      } = this;
      element.addEventListener('animationstart', () => {});
      element.addEventListener('animationend', () => {
        this.set('visible', this.get('shouldShow'));
      });
    }

  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/content/status-badge", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    tagName: 'span',
    classNames: ['badge', 'badge-default', 'z-depth-1'],
    classNameBindings: ['color'],
    color: Ember.computed('status', function () {
      switch (this.get('status')) {
        case 'Published':
          return 'bg-success';

        case 'Deleted':
          return 'bg-danger';

        case 'Draft':
          return 'bg-warning';

        case 'Scheduled':
          return 'bg-info';

        case 'Expired':
          return 'bg-warning';

        default:
          return 'bg-secondary';
      }
    })
  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/content/type-badge", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    tagName: 'span',
    classNames: ['badge', 'badge-white', 'bg-primary', 'z-depth-1']
  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/ember-wormhole", ["exports", "ember-wormhole/components/ember-wormhole"], function (_exports, _emberWormhole) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberWormhole.default;
    }
  });
});
;define("@base-cms/manage/components/entypo-icon", ["exports", "ember-entypo/components/entypo-icon"], function (_exports, _entypoIcon) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _entypoIcon.default;
    }
  });
});
;define("@base-cms/manage/components/fetch-more", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    tagName: '',

    /**
     * The Apollo client query observable.
     * @type {Observable}
     */
    query: null,
    hasNextPage: false,
    endCursor: null,
    resultKey: null,
    applyToField: null,
    isFetching: false,
    nodes: Ember.computed('edges.@each.node', function () {
      const edges = this.get('edges');
      if (!Ember.isArray(edges)) return [];
      return edges.map(edge => edge.node);
    }),

    hasEvent(name) {
      const fn = this.get(name);
      return fn && typeof fn === 'function';
    },

    sendEvent(name, ...args) {
      if (this.hasEvent(name)) this.get(name)(...args, this);
    },

    actions: {
      /**
       * Fetches more results using the observable from the original query.
       * @see https://www.apollographql.com/docs/react/features/pagination.html
       */
      async fetchMore() {
        this.set('isFetching', true);
        this.sendEvent('on-fetch-start');
        const observable = this.get('query');
        const endCursor = this.get('endCursor');
        const resultKey = this.get('resultKey');
        const applyToField = this.get('applyToField');

        const updateQuery = (previous, {
          fetchMoreResult
        }) => {
          if (applyToField) {
            const {
              edges,
              pageInfo,
              totalCount
            } = fetchMoreResult[resultKey][applyToField];
            if (!edges.length) return previous;
            return {
              [resultKey]: { ...fetchMoreResult[resultKey],
                [applyToField]: {
                  __typename: previous[resultKey][applyToField].__typename,
                  totalCount,
                  edges: [...previous[resultKey][applyToField].edges, ...edges],
                  pageInfo
                }
              }
            };
          }

          const {
            edges,
            pageInfo,
            totalCount
          } = fetchMoreResult[resultKey];
          if (!edges.length) return previous;
          return {
            [resultKey]: {
              __typename: previous[resultKey].__typename,
              totalCount,
              edges: [...previous[resultKey].edges, ...edges],
              pageInfo
            }
          };
        };

        const pagination = Ember.assign({}, observable.variables.input.pagination, {
          after: endCursor
        });
        const input = { ...observable.variables.input,
          pagination
        };
        const variables = {
          input
        };

        try {
          const result = await observable.fetchMore({
            updateQuery,
            variables
          });
          this.sendEvent('on-fetch-success', result);
          return result;
        } catch (e) {
          const evt = 'on-fetch-error';

          if (this.hasEvent(evt)) {
            this.sendEvent(evt, e);
          } else {
            throw e;
          }
        } finally {
          this.set('isFetching', false);
          this.sendEvent('on-fetch-end');
        }
      }

    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/imgix-img", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const properties = ['auto', 'border', 'border-radius', 'border-radius-inner', 'crop', 'dpr', 'fit', 'fp-x', 'fp-y', 'h', 'max-h', 'max-w', 'min-h', 'min-w', 'trim', 'w'];

  var _default = Ember.Component.extend({
    tagName: 'img',
    attributeBindings: ['src', 'alt', 'title', 'width', 'height'],
    originalSrc: null,
    dpr: Ember.computed(function () {
      return window.devicePixelRatio;
    }),
    params: Ember.computed(...properties, function () {
      return properties.map(k => {
        const v = this.get(k);
        return Ember.isPresent(v) ? `${encodeURIComponent(k)}=${encodeURIComponent(v)}` : '';
      }).filter(kv => kv !== '').join('&');
    }),
    src: Ember.computed('originalSrc', 'params', function () {
      const src = this.get('originalSrc');
      const params = this.get('params');
      return params ? `${src}?${params}` : src;
    })
  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/in-view", ["exports", "ember-in-viewport", "@base-cms/manage/mixins/send-event-mixin"], function (_exports, _emberInViewport, _sendEventMixin) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend(_emberInViewport.default, _sendEventMixin.default, {
    init() {
      this._super(...arguments);

      Ember.setProperties(this, {
        viewportSpy: true
      });
    },

    didEnterViewport() {
      this.sendEvent('on-viewport-enter');
    },

    didExitViewport() {
      this.sendEvent('on-viewport-exit');
    }

  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/loading-badge", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    tagName: '',
    isLoading: false
  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/loading-progress", ["exports", "@base-cms/manage/mixins/loading-mixin"], function (_exports, _loadingMixin) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend(_loadingMixin.default, {
    classNames: ['application-loading', 'progress', 'fixed-top'],
    attributeBindings: ['style'],
    progressBackground: 'bg-primary',
    show: Ember.computed.readOnly('loadingDisplay.isShowing'),
    style: Ember.computed('show', function () {
      const style = this.get('show') ? '' : 'display: none;';
      return Ember.String.htmlSafe(style);
    }).readOnly()
  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/nav/-content", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    classNames: ['sticky-top', 'z-depth-1-half']
  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/power-calendar-multiple", ["exports", "ember-power-calendar/components/power-calendar-multiple"], function (_exports, _powerCalendarMultiple) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _powerCalendarMultiple.default;
    }
  });
});
;define("@base-cms/manage/components/power-calendar-multiple/days", ["exports", "ember-power-calendar/components/power-calendar-multiple/days"], function (_exports, _days) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _days.default;
    }
  });
});
;define("@base-cms/manage/components/power-calendar-range", ["exports", "ember-power-calendar/components/power-calendar-range"], function (_exports, _powerCalendarRange) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _powerCalendarRange.default;
    }
  });
});
;define("@base-cms/manage/components/power-calendar-range/days", ["exports", "ember-power-calendar/components/power-calendar-range/days"], function (_exports, _days) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _days.default;
    }
  });
});
;define("@base-cms/manage/components/power-calendar", ["exports", "ember-power-calendar/components/power-calendar"], function (_exports, _powerCalendar) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _powerCalendar.default;
    }
  });
});
;define("@base-cms/manage/components/power-calendar/days", ["exports", "ember-power-calendar/components/power-calendar/days"], function (_exports, _days) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _days.default;
    }
  });
});
;define("@base-cms/manage/components/power-calendar/nav", ["exports", "ember-power-calendar/components/power-calendar/nav"], function (_exports, _nav) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _nav.default;
    }
  });
});
;define("@base-cms/manage/components/search-form", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    tagName: 'form',
    classNames: ['navbar-search', 'navbar-search-dark', 'form-inline', 'mr-3', 'd-none', 'd-md-flex', 'ml-lg-auto']
  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/user-nav", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Component.extend({
    tagName: 'ul',
    classNames: ['navbar-nav', 'align-items-center', 'd-none', 'd-md-flex']
  });

  _exports.default = _default;
});
;define("@base-cms/manage/components/welcome-page", ["exports", "ember-welcome-page/components/welcome-page"], function (_exports, _welcomePage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
;define("@base-cms/manage/controllers/content/browse", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Controller.extend({
    /**
     * Query params
     */
    queryParams: null,
    'active-tab': null,
    attribution: 'updated',
    'content-types': null,
    splitContentTypes: Ember.observer('content-types', function () {
      const value = this.get('content-types');
      this.set('selectedContentTypes', value ? value.split(',') : []);
    }),
    joinContentTypes: Ember.observer('selectedContentTypes.[]', function () {
      const value = this.get('selectedContentTypes');
      this.set('content-types', value && value.length ? value.join(',') : null);
    }),

    init() {
      this._super(...arguments);

      this.set('selectedContentTypes', []); // @todo This needs to be passed from the Graph API.

      this.set('facets', [{
        key: 'article',
        name: 'Article',
        count: 9602
      }, {
        key: 'blog',
        name: 'Blog',
        count: 1202
      }, {
        key: 'company',
        name: 'Company',
        count: 14309
      }, {
        key: 'contact',
        name: 'Contact',
        count: 3518
      }, {
        key: 'document',
        name: 'Document',
        count: 868
      }, {
        key: 'event',
        name: 'Event',
        count: 430
      }, {
        key: 'job',
        name: 'Job',
        count: 2
      }, {
        key: 'media-gallery',
        name: 'Media Gallery',
        count: 30
      }, {
        key: 'news',
        name: 'News',
        count: 5337
      }, {
        key: 'page',
        name: 'Page',
        count: 2
      }, {
        key: 'podcast',
        name: 'Podcast',
        count: 104
      }, {
        key: 'press-release',
        name: 'Press Release',
        count: 11556
      }, {
        key: 'product',
        name: 'Product',
        count: 17273
      }, {
        key: 'promotion',
        name: 'Promotion',
        count: 801
      }, {
        key: 'video',
        name: 'Video',
        count: 3922
      }, {
        key: 'webinar',
        name: 'Webinar',
        count: 10
      }, {
        key: 'whitepaper',
        name: 'Whitepaper',
        count: 350
      }]);
      this.set('queryParams', ['active-tab', 'attribution', 'content-types']);
      this.set('contentQueue', []);
    },

    actions: {
      queue(id, checked) {
        const queue = new Set(this.get('contentQueue'));

        if (checked) {
          queue.add(id);
        } else {
          queue.delete(id);
        }

        this.set('contentQueue', [...queue]);
      },

      clearQueue() {
        this.set('contentQueue', []);
      },

      toggleContentTypes(key) {
        event.preventDefault();
        const selected = this.get('selectedContentTypes');

        if (selected.indexOf(key) === -1) {
          selected.pushObject(key);
        } else {
          selected.removeObject(key);
        }
      },

      clearContentTypes() {
        this.set('selectedContentTypes', []);
      }

    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/controllers/content/browse/create", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Controller.extend({
    actions: {
      closeModal() {
        this.transitionToRoute('content.browse.index');
      }

    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/gql/fragments/content/browse", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const doc = {
    "kind": "Document",
    "definitions": [{
      "kind": "FragmentDefinition",
      "name": {
        "kind": "Name",
        "value": "ContentBrowseFragment"
      },
      "typeCondition": {
        "kind": "NamedType",
        "name": {
          "kind": "Name",
          "value": "Content"
        }
      },
      "directives": [],
      "selectionSet": {
        "kind": "SelectionSet",
        "selections": [{
          "kind": "Field",
          "name": {
            "kind": "Name",
            "value": "id"
          },
          "arguments": [],
          "directives": []
        }, {
          "kind": "Field",
          "name": {
            "kind": "Name",
            "value": "name"
          },
          "arguments": [],
          "directives": []
        }, {
          "kind": "Field",
          "name": {
            "kind": "Name",
            "value": "type"
          },
          "arguments": [{
            "kind": "Argument",
            "name": {
              "kind": "Name",
              "value": "input"
            },
            "value": {
              "kind": "ObjectValue",
              "fields": [{
                "kind": "ObjectField",
                "name": {
                  "kind": "Name",
                  "value": "format"
                },
                "value": {
                  "kind": "EnumValue",
                  "value": "titleize"
                }
              }]
            }
          }],
          "directives": []
        }, {
          "kind": "Field",
          "name": {
            "kind": "Name",
            "value": "statusText"
          },
          "arguments": [],
          "directives": []
        }, {
          "kind": "Field",
          "name": {
            "kind": "Name",
            "value": "teaser"
          },
          "arguments": [],
          "directives": []
        }, {
          "kind": "Field",
          "name": {
            "kind": "Name",
            "value": "primaryImage"
          },
          "arguments": [],
          "directives": [],
          "selectionSet": {
            "kind": "SelectionSet",
            "selections": [{
              "kind": "Field",
              "name": {
                "kind": "Name",
                "value": "id"
              },
              "arguments": [],
              "directives": []
            }, {
              "kind": "Field",
              "name": {
                "kind": "Name",
                "value": "src"
              },
              "arguments": [],
              "directives": []
            }, {
              "kind": "Field",
              "name": {
                "kind": "Name",
                "value": "alt"
              },
              "arguments": [],
              "directives": []
            }]
          }
        }, {
          "kind": "Field",
          "name": {
            "kind": "Name",
            "value": "company"
          },
          "arguments": [],
          "directives": [],
          "selectionSet": {
            "kind": "SelectionSet",
            "selections": [{
              "kind": "Field",
              "name": {
                "kind": "Name",
                "value": "id"
              },
              "arguments": [],
              "directives": []
            }, {
              "kind": "Field",
              "name": {
                "kind": "Name",
                "value": "name"
              },
              "arguments": [],
              "directives": []
            }]
          }
        }, {
          "kind": "Field",
          "name": {
            "kind": "Name",
            "value": "updated"
          },
          "arguments": [],
          "directives": []
        }, {
          "kind": "Field",
          "name": {
            "kind": "Name",
            "value": "created"
          },
          "arguments": [],
          "directives": []
        }, {
          "kind": "Field",
          "name": {
            "kind": "Name",
            "value": "updatedBy"
          },
          "arguments": [],
          "directives": [],
          "selectionSet": {
            "kind": "SelectionSet",
            "selections": [{
              "kind": "Field",
              "name": {
                "kind": "Name",
                "value": "id"
              },
              "arguments": [],
              "directives": []
            }, {
              "kind": "Field",
              "name": {
                "kind": "Name",
                "value": "username"
              },
              "arguments": [],
              "directives": []
            }, {
              "kind": "Field",
              "name": {
                "kind": "Name",
                "value": "firstName"
              },
              "arguments": [],
              "directives": []
            }, {
              "kind": "Field",
              "name": {
                "kind": "Name",
                "value": "lastName"
              },
              "arguments": [],
              "directives": []
            }]
          }
        }, {
          "kind": "Field",
          "name": {
            "kind": "Name",
            "value": "createdBy"
          },
          "arguments": [],
          "directives": [],
          "selectionSet": {
            "kind": "SelectionSet",
            "selections": [{
              "kind": "Field",
              "name": {
                "kind": "Name",
                "value": "id"
              },
              "arguments": [],
              "directives": []
            }, {
              "kind": "Field",
              "name": {
                "kind": "Name",
                "value": "username"
              },
              "arguments": [],
              "directives": []
            }, {
              "kind": "Field",
              "name": {
                "kind": "Name",
                "value": "firstName"
              },
              "arguments": [],
              "directives": []
            }, {
              "kind": "Field",
              "name": {
                "kind": "Name",
                "value": "lastName"
              },
              "arguments": [],
              "directives": []
            }]
          }
        }]
      }
    }],
    "loc": {
      "start": 0,
      "end": 342
    }
  };
  var _default = doc;
  _exports.default = _default;
});
;define("@base-cms/manage/gql/fragments/content/edit", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const doc = {
    "kind": "Document",
    "definitions": [{
      "kind": "FragmentDefinition",
      "name": {
        "kind": "Name",
        "value": "ContentEditFragment"
      },
      "typeCondition": {
        "kind": "NamedType",
        "name": {
          "kind": "Name",
          "value": "Content"
        }
      },
      "directives": [],
      "selectionSet": {
        "kind": "SelectionSet",
        "selections": [{
          "kind": "Field",
          "name": {
            "kind": "Name",
            "value": "id"
          },
          "arguments": [],
          "directives": []
        }, {
          "kind": "Field",
          "name": {
            "kind": "Name",
            "value": "name"
          },
          "arguments": [],
          "directives": []
        }, {
          "kind": "Field",
          "name": {
            "kind": "Name",
            "value": "type"
          },
          "arguments": [{
            "kind": "Argument",
            "name": {
              "kind": "Name",
              "value": "input"
            },
            "value": {
              "kind": "ObjectValue",
              "fields": [{
                "kind": "ObjectField",
                "name": {
                  "kind": "Name",
                  "value": "format"
                },
                "value": {
                  "kind": "EnumValue",
                  "value": "titleize"
                }
              }]
            }
          }],
          "directives": []
        }, {
          "kind": "Field",
          "name": {
            "kind": "Name",
            "value": "teaser"
          },
          "arguments": [],
          "directives": []
        }, {
          "kind": "Field",
          "name": {
            "kind": "Name",
            "value": "primaryImage"
          },
          "arguments": [],
          "directives": [],
          "selectionSet": {
            "kind": "SelectionSet",
            "selections": [{
              "kind": "Field",
              "name": {
                "kind": "Name",
                "value": "id"
              },
              "arguments": [],
              "directives": []
            }, {
              "kind": "Field",
              "name": {
                "kind": "Name",
                "value": "src"
              },
              "arguments": [],
              "directives": []
            }, {
              "kind": "Field",
              "name": {
                "kind": "Name",
                "value": "alt"
              },
              "arguments": [],
              "directives": []
            }]
          }
        }]
      }
    }],
    "loc": {
      "start": 0,
      "end": 145
    }
  };
  var _default = doc;
  _exports.default = _default;
});
;define("@base-cms/manage/gql/queries/content/browse", ["exports", "@base-cms/manage/gql/fragments/content/browse"], function (_exports, _browse) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const doc = {
    "kind": "Document",
    "definitions": [{
      "kind": "OperationDefinition",
      "operation": "query",
      "name": {
        "kind": "Name",
        "value": "ContentIndex"
      },
      "variableDefinitions": [{
        "kind": "VariableDefinition",
        "variable": {
          "kind": "Variable",
          "name": {
            "kind": "Name",
            "value": "input"
          }
        },
        "type": {
          "kind": "NonNullType",
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "AllContentQueryInput"
            }
          }
        }
      }],
      "directives": [],
      "selectionSet": {
        "kind": "SelectionSet",
        "selections": [{
          "kind": "Field",
          "name": {
            "kind": "Name",
            "value": "allContent"
          },
          "arguments": [{
            "kind": "Argument",
            "name": {
              "kind": "Name",
              "value": "input"
            },
            "value": {
              "kind": "Variable",
              "name": {
                "kind": "Name",
                "value": "input"
              }
            }
          }],
          "directives": [],
          "selectionSet": {
            "kind": "SelectionSet",
            "selections": [{
              "kind": "Field",
              "name": {
                "kind": "Name",
                "value": "edges"
              },
              "arguments": [],
              "directives": [],
              "selectionSet": {
                "kind": "SelectionSet",
                "selections": [{
                  "kind": "Field",
                  "name": {
                    "kind": "Name",
                    "value": "node"
                  },
                  "arguments": [],
                  "directives": [],
                  "selectionSet": {
                    "kind": "SelectionSet",
                    "selections": [{
                      "kind": "FragmentSpread",
                      "name": {
                        "kind": "Name",
                        "value": "ContentBrowseFragment"
                      },
                      "directives": []
                    }]
                  }
                }]
              }
            }, {
              "kind": "Field",
              "name": {
                "kind": "Name",
                "value": "pageInfo"
              },
              "arguments": [],
              "directives": [],
              "selectionSet": {
                "kind": "SelectionSet",
                "selections": [{
                  "kind": "Field",
                  "name": {
                    "kind": "Name",
                    "value": "endCursor"
                  },
                  "arguments": [],
                  "directives": []
                }, {
                  "kind": "Field",
                  "name": {
                    "kind": "Name",
                    "value": "hasNextPage"
                  },
                  "arguments": [],
                  "directives": []
                }]
              }
            }]
          }
        }]
      }
    }],
    "loc": {
      "start": 0,
      "end": 271
    }
  };
  var _default = doc;
  _exports.default = _default;
  doc.definitions = doc.definitions.concat(_browse.default.definitions);
});
;define("@base-cms/manage/gql/queries/content/edit", ["exports", "@base-cms/manage/gql/fragments/content/edit"], function (_exports, _edit) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const doc = {
    "kind": "Document",
    "definitions": [{
      "kind": "OperationDefinition",
      "operation": "query",
      "name": {
        "kind": "Name",
        "value": "ContentEdit"
      },
      "variableDefinitions": [{
        "kind": "VariableDefinition",
        "variable": {
          "kind": "Variable",
          "name": {
            "kind": "Name",
            "value": "input"
          }
        },
        "type": {
          "kind": "NonNullType",
          "type": {
            "kind": "NamedType",
            "name": {
              "kind": "Name",
              "value": "ContentQueryInput"
            }
          }
        }
      }],
      "directives": [],
      "selectionSet": {
        "kind": "SelectionSet",
        "selections": [{
          "kind": "Field",
          "name": {
            "kind": "Name",
            "value": "content"
          },
          "arguments": [{
            "kind": "Argument",
            "name": {
              "kind": "Name",
              "value": "input"
            },
            "value": {
              "kind": "Variable",
              "name": {
                "kind": "Name",
                "value": "input"
              }
            }
          }],
          "directives": [],
          "selectionSet": {
            "kind": "SelectionSet",
            "selections": [{
              "kind": "FragmentSpread",
              "name": {
                "kind": "Name",
                "value": "ContentEditFragment"
              },
              "directives": []
            }]
          }
        }]
      }
    }],
    "loc": {
      "start": 0,
      "end": 162
    }
  };
  var _default = doc;
  _exports.default = _default;
  doc.definitions = doc.definitions.concat(_edit.default.definitions);
});
;define("@base-cms/manage/helpers/app-version", ["exports", "@base-cms/manage/config/environment", "ember-cli-app-version/utils/regexp"], function (_exports, _environment, _regexp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.appVersion = appVersion;
  _exports.default = void 0;

  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version; // e.g. 1.0.0-alpha.1+4jds75hf
    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility

    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;
    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      } // Fallback to just version


      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  var _default = Ember.Helper.helper(appVersion);

  _exports.default = _default;
});
;define("@base-cms/manage/helpers/assign", ["exports", "ember-assign-helper/helpers/assign"], function (_exports, _assign) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _assign.default;
    }
  });
  Object.defineProperty(_exports, "assign", {
    enumerable: true,
    get: function () {
      return _assign.assign;
    }
  });
});
;define("@base-cms/manage/helpers/cancel-all", ["exports", "ember-concurrency/helpers/cancel-all"], function (_exports, _cancelAll) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _cancelAll.default;
    }
  });
});
;define("@base-cms/manage/helpers/ember-power-calendar-day-classes", ["exports", "ember-power-calendar/helpers/ember-power-calendar-day-classes"], function (_exports, _emberPowerCalendarDayClasses) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberPowerCalendarDayClasses.default;
    }
  });
  Object.defineProperty(_exports, "emberPowerCalendarDayClasses", {
    enumerable: true,
    get: function () {
      return _emberPowerCalendarDayClasses.emberPowerCalendarDayClasses;
    }
  });
});
;define("@base-cms/manage/helpers/format-number", ["exports", "numeral"], function (_exports, _numeral) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.format = format;
  _exports.default = void 0;

  function format(params) {
    const format = params[1] || '0.00a';
    return (0, _numeral.default)(params[0]).format(format);
  }

  var _default = Ember.Helper.helper(format);

  _exports.default = _default;
});
;define("@base-cms/manage/helpers/is-after", ["exports", "ember-moment/helpers/is-after"], function (_exports, _isAfter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isAfter.default;
    }
  });
});
;define("@base-cms/manage/helpers/is-before", ["exports", "ember-moment/helpers/is-before"], function (_exports, _isBefore) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isBefore.default;
    }
  });
});
;define("@base-cms/manage/helpers/is-between", ["exports", "ember-moment/helpers/is-between"], function (_exports, _isBetween) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isBetween.default;
    }
  });
});
;define("@base-cms/manage/helpers/is-same-or-after", ["exports", "ember-moment/helpers/is-same-or-after"], function (_exports, _isSameOrAfter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isSameOrAfter.default;
    }
  });
});
;define("@base-cms/manage/helpers/is-same-or-before", ["exports", "ember-moment/helpers/is-same-or-before"], function (_exports, _isSameOrBefore) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isSameOrBefore.default;
    }
  });
});
;define("@base-cms/manage/helpers/is-same", ["exports", "ember-moment/helpers/is-same"], function (_exports, _isSame) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _isSame.default;
    }
  });
});
;define("@base-cms/manage/helpers/moment-add", ["exports", "ember-moment/helpers/moment-add"], function (_exports, _momentAdd) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _momentAdd.default;
    }
  });
});
;define("@base-cms/manage/helpers/moment-calendar", ["exports", "ember-moment/helpers/moment-calendar"], function (_exports, _momentCalendar) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _momentCalendar.default;
    }
  });
});
;define("@base-cms/manage/helpers/moment-diff", ["exports", "ember-moment/helpers/moment-diff"], function (_exports, _momentDiff) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _momentDiff.default;
    }
  });
});
;define("@base-cms/manage/helpers/moment-duration", ["exports", "ember-moment/helpers/moment-duration"], function (_exports, _momentDuration) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _momentDuration.default;
    }
  });
});
;define("@base-cms/manage/helpers/moment-format", ["exports", "ember-moment/helpers/moment-format"], function (_exports, _momentFormat) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _momentFormat.default;
    }
  });
});
;define("@base-cms/manage/helpers/moment-from-now", ["exports", "ember-moment/helpers/moment-from-now"], function (_exports, _momentFromNow) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _momentFromNow.default;
    }
  });
});
;define("@base-cms/manage/helpers/moment-from", ["exports", "ember-moment/helpers/moment-from"], function (_exports, _momentFrom) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _momentFrom.default;
    }
  });
});
;define("@base-cms/manage/helpers/moment-subtract", ["exports", "ember-moment/helpers/moment-subtract"], function (_exports, _momentSubtract) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _momentSubtract.default;
    }
  });
});
;define("@base-cms/manage/helpers/moment-to-date", ["exports", "ember-moment/helpers/moment-to-date"], function (_exports, _momentToDate) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _momentToDate.default;
    }
  });
});
;define("@base-cms/manage/helpers/moment-to-now", ["exports", "ember-moment/helpers/moment-to-now"], function (_exports, _momentToNow) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _momentToNow.default;
    }
  });
});
;define("@base-cms/manage/helpers/moment-to", ["exports", "ember-moment/helpers/moment-to"], function (_exports, _momentTo) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _momentTo.default;
    }
  });
});
;define("@base-cms/manage/helpers/moment-unix", ["exports", "ember-moment/helpers/unix"], function (_exports, _unix) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _unix.default;
    }
  });
});
;define("@base-cms/manage/helpers/moment", ["exports", "ember-moment/helpers/moment"], function (_exports, _moment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _moment.default;
    }
  });
});
;define("@base-cms/manage/helpers/now", ["exports", "ember-moment/helpers/now"], function (_exports, _now) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _now.default;
    }
  });
});
;define("@base-cms/manage/helpers/perform", ["exports", "ember-concurrency/helpers/perform"], function (_exports, _perform) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _perform.default;
    }
  });
});
;define("@base-cms/manage/helpers/power-calendar-format-date", ["exports", "ember-power-calendar/helpers/power-calendar-format-date"], function (_exports, _powerCalendarFormatDate) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _powerCalendarFormatDate.default;
    }
  });
  Object.defineProperty(_exports, "powerCalendarFormatDate", {
    enumerable: true,
    get: function () {
      return _powerCalendarFormatDate.powerCalendarFormatDate;
    }
  });
});
;define("@base-cms/manage/helpers/task", ["exports", "ember-concurrency/helpers/task"], function (_exports, _task) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _task.default;
    }
  });
});
;define("@base-cms/manage/helpers/unix", ["exports", "ember-moment/helpers/unix"], function (_exports, _unix) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _unix.default;
    }
  });
});
;define("@base-cms/manage/helpers/utc", ["exports", "ember-moment/helpers/utc"], function (_exports, _utc) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _utc.default;
    }
  });
  Object.defineProperty(_exports, "utc", {
    enumerable: true,
    get: function () {
      return _utc.utc;
    }
  });
});
;define("@base-cms/manage/initializers/app-version", ["exports", "ember-cli-app-version/initializer-factory", "@base-cms/manage/config/environment"], function (_exports, _initializerFactory, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  let name, version;

  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  var _default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
  _exports.default = _default;
});
;define("@base-cms/manage/initializers/container-debug-adapter", ["exports", "ember-resolver/resolvers/classic/container-debug-adapter"], function (_exports, _containerDebugAdapter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];
      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }

  };
  _exports.default = _default;
});
;define("@base-cms/manage/initializers/ember-concurrency", ["exports", "ember-concurrency/initializers/ember-concurrency"], function (_exports, _emberConcurrency) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _emberConcurrency.default;
    }
  });
});
;define("@base-cms/manage/initializers/export-application-global", ["exports", "@base-cms/manage/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.initialize = initialize;
  _exports.default = void 0;

  function initialize() {
    var application = arguments[1] || arguments[0];

    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;

      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;
        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);

            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  var _default = {
    name: 'export-application-global',
    initialize: initialize
  };
  _exports.default = _default;
});
;define("@base-cms/manage/initializers/viewport-config", ["exports", "ember-in-viewport/initializers/viewport-config"], function (_exports, _viewportConfig) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _viewportConfig.default;
    }
  });
  Object.defineProperty(_exports, "initialize", {
    enumerable: true,
    get: function () {
      return _viewportConfig.initialize;
    }
  });
});
;define("@base-cms/manage/mixins/init-value-mixin", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Mixin.create({
    /**
     * Initializes a value.
     *
     * @param {string} prop The property to initalize
     * @param {*} toSet The value to set when not the prop is not present.
     */
    initValue(prop, toSet) {
      const value = this.get(prop);

      if (Ember.isArray(toSet) && !Ember.isArray(value)) {
        // Force the value to an array.
        this.set(prop, toSet);
        return;
      } // When present, do nothing.


      if (Ember.isPresent(value)) return; // Set the default value;

      this.set(prop, toSet);
    }

  });

  _exports.default = _default;
});
;define("@base-cms/manage/mixins/loading-mixin", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Mixin.create({
    loadingDisplay: Ember.inject.service(),

    showLoading() {
      this.get('loadingDisplay').show();
    },

    hideLoading() {
      this.get('loadingDisplay').hide();
    }

  });

  _exports.default = _default;
});
;define("@base-cms/manage/mixins/route-observable-mixin", ["exports", "ember-apollo-client"], function (_exports, _emberApolloClient) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Mixin.create(_emberApolloClient.RouteQueryManager, {
    /**
     * Gets the observable for the provided result.
     */
    getObservable(result) {
      return (0, _emberApolloClient.getObservable)(result);
    },

    /**
     * Gets the controller for the current route.
     */
    getController() {
      return this.controllerFor(this.get('routeName'));
    }

  });

  _exports.default = _default;
});
;define("@base-cms/manage/mixins/send-event-mixin", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Mixin.create({
    sendEvent(name, ...args) {
      const fn = this.get(name);
      if (typeof fn === 'function') fn(...args);
    }

  });

  _exports.default = _default;
});
;define("@base-cms/manage/resolver", ["exports", "ember-resolver"], function (_exports, _emberResolver) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _emberResolver.default;
  _exports.default = _default;
});
;define("@base-cms/manage/router", ["exports", "@base-cms/manage/config/environment"], function (_exports, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });
  Router.map(function () {
    this.route('content', function () {
      this.route('browse', {
        path: ''
      }, function () {
        this.route('create');
      });
      this.route('edit', {
        path: ':type/:id'
      }, function () {});
    });
  });
  var _default = Router;
  _exports.default = _default;
});
;define("@base-cms/manage/routes/application", ["exports", "@base-cms/manage/mixins/loading-mixin"], function (_exports, _loadingMixin) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend(_loadingMixin.default, {
    actions: {
      /**
       *
       * @param {*} transition
       */
      loading(transition) {
        this.showLoading();
        transition.finally(() => this.hideLoading());
      }

    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/routes/content/browse", ["exports", "@base-cms/manage/mixins/route-observable-mixin", "@base-cms/manage/gql/queries/content/browse"], function (_exports, _routeObservableMixin, _browse) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend(_routeObservableMixin.default, {
    queryParams: {
      attribution: {
        refreshModel: false
      },
      'content-types': {
        refreshModel: true
      }
    },

    /**
     *
     * @param {object} params
     */
    async model() {
      const input = {
        sort: {
          field: 'updated',
          order: 'desc'
        },
        pagination: {
          limit: 24
        },
        status: 'any'
      };
      const variables = {
        input
      };
      const response = await this.get('apollo').watchQuery({
        query: _browse.default,
        variables,
        fetchPolicy: 'network-only'
      }, 'allContent');
      this.getController().set('observable', this.getObservable(response));
      return response;
    }

  });

  _exports.default = _default;
});
;define("@base-cms/manage/routes/content/edit", ["exports", "ember-apollo-client", "@base-cms/manage/gql/queries/content/edit"], function (_exports, _emberApolloClient, _edit) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend(_emberApolloClient.RouteQueryManager, {
    /**
     *
     * @param {object} params
     */
    model({
      id
    }) {
      const input = {
        id: parseInt(id, 10),
        status: 'any'
      };
      const variables = {
        input
      };
      return this.get('apollo').watchQuery({
        query: _edit.default,
        variables,
        fetchPolicy: 'network-only'
      }, 'content');
    }

  });

  _exports.default = _default;
});
;define("@base-cms/manage/routes/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Route.extend({
    beforeModel() {
      this.transitionTo('content');
    }

  });

  _exports.default = _default;
});
;define("@base-cms/manage/services/-observer-admin", ["exports", "ember-in-viewport/services/-observer-admin"], function (_exports, _observerAdmin) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _observerAdmin.default;
    }
  });
});
;define("@base-cms/manage/services/-raf-admin", ["exports", "ember-in-viewport/services/-raf-admin"], function (_exports, _rafAdmin) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _rafAdmin.default;
    }
  });
});
;define("@base-cms/manage/services/ajax", ["exports", "ember-ajax/services/ajax"], function (_exports, _ajax) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
;define("@base-cms/manage/services/apollo", ["exports", "ember-apollo-client/services/apollo", "apollo-cache-inmemory", "@base-cms/graphql-fragment-types"], function (_exports, _apollo, _apolloCacheInmemory, _graphqlFragmentTypes) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = _apollo.default.extend({
    clientOptions: Ember.computed(function () {
      return {
        link: this.get('link'),
        cache: new _apolloCacheInmemory.InMemoryCache({
          fragmentMatcher: this.get('fragmentMatcher')
        })
      };
    }),
    fragmentMatcher: Ember.computed(function () {
      return new _apolloCacheInmemory.IntrospectionFragmentMatcher({
        introspectionQueryResultData: _graphqlFragmentTypes.default
      });
    })
  });

  _exports.default = _default;
});
;define("@base-cms/manage/services/global-events", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Service.extend({
    init() {
      this._super(...arguments);

      const types = ['keyup'];
      this.set('types', types);
      this.set('listeners', {});
      const {
        body
      } = document;
      const handler = this.handle.bind(this);
      types.forEach(type => {
        body.addEventListener(type, handler);
      });
      this.set('onDestroy', () => {
        types.forEach(type => {
          body.removeEventListener(type, handler);
        });
      });
    },

    addListener(type, fn) {
      const listeners = this.initListener(type);
      listeners.push(fn);
    },

    removeListener(type, fn) {
      const listeners = this.initListener(type);
      const index = listeners.indexOf(fn);
      if (index > -1) listeners.splice(index, 1);
    },

    initListener(type) {
      if (!this.get('types').includes(type)) throw new Error(`No global event listener available for type '${type}'`);
      const key = `listeners.${type}`;
      if (!this.get(key)) this.set(key, []);
      return this.get(key);
    },

    handle(event) {
      const {
        type
      } = event;
      const listeners = this.get(`listeners.${type}`) || [];
      listeners.map(fn => fn(event));
    },

    willDestroy() {
      this._super(...arguments);

      this.get('onDestroy')();
    }

  });

  _exports.default = _default;
});
;define("@base-cms/manage/services/loading-display", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.Service.extend({
    isShowing: false,

    show() {
      if (!this.get('isShowing')) {
        this.set('isShowing', true);
        Ember.$('body').addClass('transitioning');
      }
    },

    hide() {
      window.setTimeout(() => {
        this.set('isShowing', false);
        Ember.$('body').removeClass('transitioning');
      }, 100);
    }

  });

  _exports.default = _default;
});
;define("@base-cms/manage/services/mock-data", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const content = [{
    id: 21044236,
    title: 'Why Marketers Must Embrace Ethical Data Use',
    teaser: 'Data Privacy Week gives all of us an opportunity to reflect on how the conversation surrounding data has shifted in the last year or so. We’ve seen a much more intense focus on using data in a responsible manner',
    image: {
      src: 'https://fortnight.imgix.net/acbm/5beae595f3eec100014dccf5/Jordan%20Abbott%202018.jpg?crop=focalpoint&dpr=2&fit=crop&fp-x=0.55&fp-y=0.24&h=270&w=480',
      alt: 'image alt'
    },
    type: 'Article',
    status: 'Published',
    updated: new Date(),
    updatedBy: {
      username: 'jbare@southcomm.com'
    }
  }, {
    id: 21044229,
    title: 'Data-Driven Marketers: It takes big and small to know it all',
    teaser: 'We have so much data at our fingertips, it can be easy to fall into the trap of assuming that we know our customers.',
    image: {
      src: 'https://fortnight.imgix.net/acbm/5be5b9e28e1d720001f99577/Small_Data_Blog_Post_Zlatko-1.jpg?crop=focalpoint&dpr=2&fit=crop&fp-x=0.51&fp-y=0.52&h=270&w=480',
      alt: 'image alt'
    },
    type: 'Press Release',
    status: 'Draft',
    updated: new Date(),
    updatedBy: {
      username: 'bkrigbaum@southcomm.com'
    }
  }, {
    id: 21044231,
    title: 'Toughened Epoxy Resists High Temperatures & Chemicals',
    teaser: 'Master Bond Supreme 62-1 delivers enhanced chemical and temperature resistance while maintaining high performance properties. This adhesive offers excellent flow properties and a long working life over a wide service temperature range.',
    image: {
      src: 'https://fortnight.imgix.net/acbm/5c1d09e2120492000161be08/SUP62-1.jpg?crop=focalpoint&dpr=2&fit=crop&h=270&w=480',
      alt: ''
    },
    type: 'Blog',
    status: 'Published',
    updated: new Date(),
    updatedBy: {
      username: 'ppeluso@southcomm.com'
    }
  }, {
    id: 21044227,
    title: 'Monster 4 Drawer Cart with larger top storage',
    teaser: 'This professional cart provides lots of storage and has a large 15.6″ tall top storage compartment, latching drawers and PVC drawer liners. 5″ HD casters for smooth mobility. Bumpers provide extra protection in case of contact with painted surfaces.',
    image: {
      src: 'https://fortnight.imgix.net/ebm/5bcf4cc20787b80001c2ded0/MST3304XORNG.5b6871b32aee9.jpg?crop=focalpoint&dpr=2&fit=crop&fp-x=0.46&fp-y=0.48&h=270&w=480',
      alt: ''
    },
    type: 'News',
    status: 'Scheduled',
    updated: new Date(),
    updatedBy: {
      username: 'sscullin@southcomm.com'
    }
  }, {
    id: 21044111,
    title: 'Designed for EXTREME environments',
    teaser: 'The G-SHOCK MUDMASTER GG1000 is an ideal "Every Day Carry" item as it\'s mud resistant construction helps to ensure that nothing gets into the watch under tough conditions.',
    image: {
      src: 'https://fortnight.imgix.net/ebm/5c2cf775cc527100017d01c8/FTSbFj1w.png?crop=focalpoint&dpr=2&fit=crop&h=270&w=480',
      alt: ''
    },
    type: 'Article',
    status: 'Published',
    updated: new Date(),
    updatedBy: {
      username: 'bmiller@southcomm.com'
    }
  }, {
    id: 21044110,
    title: 'Globe ATHLETIX™ - Like nothing you’ve ever experienced.',
    teaser: 'All-new athletic design with stretch fabrics for body-contoured, less bulky fit, lighter weight, and unprecedented range of motion.',
    image: {
      src: 'https://fortnight.imgix.net/ebm/5c3e0857353611000143406f/Native%20Ad%20for%20ATHLETIX%20new%20image%20with%20MSA%20tank%20logo%201800x1012.jpg?crop=focalpoint&dpr=2&fit=crop&h=270&w=480',
      alt: ''
    },
    type: 'Video',
    status: 'Deleted',
    updated: new Date(),
    updatedBy: {
      username: 'jworden@southcomm.com'
    }
  }, {
    id: 21044109,
    title: 'Center Brunswick Vol. Fire Department receives Marion Pumper',
    teaser: 'Marion\'s priority is to listen to the customer\'s needs. Check out more departments that have experienced the Marion Difference!',
    image: {
      src: 'https://fortnight.imgix.net/ebm/5c0e7078cf399b00017997e3/Center%20Brunswick.jpg?crop=focalpoint&dpr=2&fit=crop&fp-x=0.27&fp-y=0.45&h=270&w=480',
      alt: ''
    },
    type: 'Press Release',
    status: 'Draft',
    updated: new Date(),
    updatedBy: {
      username: 'jfitzgerald@southcomm.com'
    }
  }, {
    id: 21044106,
    title: 'Connect with the future of mobility at ABB Customer World',
    teaser: 'Formula E is at the forefront not only of electric vehicle technology but of IoT, data analytics and real-time communications. See how ABB FIA Formula E is shaping the future of mobility at ABB Customer World, March 4-7. Registration is FREE.',
    image: {
      src: 'https://fortnight.imgix.net/ebm/5c353642e36e7700018eb020/ABB-1753-CID_1200x628.jpeg?crop=focalpoint&dpr=2&fit=crop&h=270&w=480',
      alt: ''
    },
    type: 'Product',
    status: 'Published',
    updated: new Date(),
    updatedBy: {
      username: 'bkrigbaum@southcomm.com'
    }
  }, {
    id: 21044088,
    title: 'Good Quality - Sufficently Rugged',
    teaser: 'Through superior mud resistant construction, the G-SHOCK Mudmaster GG1000 is designed to withstand all environments, offering all of the characteristics you\'ve come to expect from G-SHOCK.',
    image: {
      src: 'https://fortnight.imgix.net/ebm/5c2cf819cc527100017d0f1d/gg1000mud-1-hd.jpg?crop=focalpoint&dpr=2&fit=crop&h=270&w=480',
      alt: ''
    },
    type: 'News',
    status: 'Scheduled',
    updated: new Date(),
    updatedBy: {
      username: 'jbare@southcomm.com'
    }
  }];

  var _default = Ember.Service.extend({
    allContent() {
      return content;
    },

    content(id) {
      return content.find(c => c.id === parseInt(id, 10));
    }

  });

  _exports.default = _default;
});
;define("@base-cms/manage/services/moment", ["exports", "ember-moment/services/moment", "@base-cms/manage/config/environment"], function (_exports, _moment, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const {
    get
  } = Ember;

  var _default = _moment.default.extend({
    defaultFormat: get(_environment.default, 'moment.outputFormat')
  });

  _exports.default = _default;
});
;define("@base-cms/manage/services/power-calendar", ["exports", "ember-power-calendar/services/power-calendar"], function (_exports, _powerCalendar) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _powerCalendar.default;
    }
  });
});
;define("@base-cms/manage/templates/application", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "zEz6iqwl",
    "block": "{\"symbols\":[],\"statements\":[[1,[21,\"outlet\"],false]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/application.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/bs-modal", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "UUQewtn2",
    "block": "{\"symbols\":[\"wrapper\",\"&default\"],\"statements\":[[4,\"if\",[[23,[\"show\"]]],null,{\"statements\":[[4,\"ember-wormhole\",null,[[\"to\"],[[23,[\"to\"]]]],{\"statements\":[[4,\"bs-modal/wrapper\",null,[[\"fade\",\"backdrop\",\"keyboard\",\"focus\",\"show\",\"size\",\"contentClass\",\"dialogClass\",\"onHide\",\"onHidden\",\"onClose\",\"onShow\",\"onShown\"],[[23,[\"fade\"]],[23,[\"backdrop\"]],[23,[\"keyboard\"]],[23,[\"focus\"]],[23,[\"show\"]],[23,[\"size\"]],[23,[\"contentClass\"]],[23,[\"dialogClass\"]],[23,[\"onHide\"]],[23,[\"onHidden\"]],[23,[\"onClose\"]],[23,[\"onShow\"]],[23,[\"onShown\"]]]],{\"statements\":[[0,\"      \"],[14,2,[[22,1,[]]]],[0,\"\\n\"]],\"parameters\":[1]},null]],\"parameters\":[]},null]],\"parameters\":[]},null]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/bs-modal.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/bs-modal/body", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "19pGvFO9",
    "block": "{\"symbols\":[\"&default\"],\"statements\":[[14,1],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/bs-modal/body.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/bs-modal/dialog", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "2ttEob6Y",
    "block": "{\"symbols\":[\"&default\"],\"statements\":[[14,1],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/bs-modal/dialog.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/bs-modal/footer", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "t58vg7HU",
    "block": "{\"symbols\":[\"&default\"],\"statements\":[[14,1],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/bs-modal/footer.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/bs-modal/header", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "FF6W9R9K",
    "block": "{\"symbols\":[\"&default\"],\"statements\":[[14,1],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/bs-modal/header.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/bs-modal/wrapper", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "phigX/Pz",
    "block": "{\"symbols\":[\"&default\"],\"statements\":[[4,\"bs-modal/dialog\",null,[[\"size\",\"class\"],[[23,[\"size\"]],[23,[\"dialogClass\"]]]],{\"statements\":[[0,\"  \"],[7,\"div\"],[12,\"class\",[28,[\"modal-content \",[21,\"contentClass\"]]]],[9],[0,\"\\n    \"],[14,1,[[27,\"hash\",null,[[\"header\",\"body\",\"footer\",\"actions\"],[[27,\"component\",[\"bs-modal/header\"],null],[27,\"component\",[\"bs-modal/body\"],null],[27,\"component\",[\"bs-modal/footer\"],null],[27,\"hash\",null,[[\"hide\",\"show\"],[[27,\"action\",[[22,0,[]],\"hide\"],null],[27,\"action\",[[22,0,[]],\"show\"],null]]]]]]]]],[0,\"\\n  \"],[10],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/bs-modal/wrapper.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/btn-scroll-top", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "DAKcK+hT",
    "block": "{\"symbols\":[],\"statements\":[[1,[27,\"entypo-icon\",[\"chevron-up\"],null],false],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/btn-scroll-top.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/content-card", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "CmiOQcuG",
    "block": "{\"symbols\":[\"company\"],\"statements\":[[7,\"div\"],[11,\"class\",\"card content z-depth-1 border-0 mnh-100\"],[9],[0,\"\\n\\n  \"],[1,[27,\"content-card/image-cap\",null,[[\"contentId\",\"type\",\"name\",\"statusText\",\"image\"],[[23,[\"content\",\"id\"]],[23,[\"content\",\"type\"]],[23,[\"content\",\"name\"]],[23,[\"content\",\"statusText\"]],[23,[\"content\",\"primaryImage\"]]]]],false],[0,\"\\n\\n  \"],[7,\"div\"],[11,\"class\",\"card-body border-top\"],[9],[0,\"\\n    \"],[7,\"h4\"],[11,\"class\",\"card-title mb-0\"],[9],[0,\"\\n\"],[4,\"content/edit-link\",null,[[\"contentId\",\"type\"],[[23,[\"content\",\"id\"]],[23,[\"content\",\"type\"]]]],{\"statements\":[[0,\"        \"],[1,[23,[\"content\",\"name\"]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[10],[0,\"\\n\"],[4,\"with\",[[23,[\"content\",\"company\"]]],null,{\"statements\":[[4,\"if\",[[22,1,[\"id\"]]],null,{\"statements\":[[0,\"        \"],[7,\"small\"],[11,\"class\",\"d-block mt-1 mb-0\"],[9],[0,\"\\n          From:\\n          \"],[4,\"content/edit-link\",null,[[\"contentId\",\"type\"],[[22,1,[\"id\"]],\"Company\"]],{\"statements\":[[1,[22,1,[\"name\"]],false]],\"parameters\":[]},null],[0,\"\\n        \"],[10],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[1]},null],[0,\"    \"],[7,\"p\"],[11,\"class\",\"card-text mt-3 mb-0\"],[9],[0,\"\\n      \"],[1,[21,\"teaserTruncated\"],false],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\\n  \"],[7,\"div\"],[11,\"class\",\"card-footer py-2\"],[9],[0,\"\\n\\n    \"],[7,\"div\"],[11,\"class\",\"d-flex justify-content-between\"],[9],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"d-flex flex-column mr-1\"],[9],[0,\"\\n        \"],[7,\"small\"],[11,\"class\",\"d-block\"],[9],[0,\"\\n          \"],[1,[27,\"entypo-icon\",[\"key\"],null],false],[0,\"\\n          \"],[1,[23,[\"content\",\"id\"]],false],[0,\"\\n        \"],[10],[0,\"\\n        \"],[1,[27,\"content-card/user-attribution\",null,[[\"created\",\"createdBy\",\"updated\",\"updatedBy\",\"selected\"],[[23,[\"content\",\"created\"]],[23,[\"content\",\"createdBy\",\"username\"]],[23,[\"content\",\"updated\"]],[23,[\"content\",\"updatedBy\",\"username\"]],[23,[\"attributionType\"]]]]],false],[0,\"\\n      \"],[10],[0,\"  \\n\\n\\n      \"],[7,\"label\"],[11,\"class\",\"custom-toggle mt-auto mb-0\"],[9],[0,\"\\n        \"],[1,[27,\"input\",null,[[\"type\",\"checked\",\"change\"],[\"checkbox\",[23,[\"isQueued\"]],[27,\"action\",[[22,0,[]],\"emitQueueChange\"],null]]]],false],[0,\"\\n        \"],[7,\"span\"],[11,\"class\",\"custom-toggle-slider rounded-circle\"],[9],[10],[0,\"\\n      \"],[10],[0,\"\\n      \\n    \"],[10],[0,\"\\n\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/content-card.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/content-card/image-cap", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "qZE/cjrO",
    "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"embed-responsive-item d-flex align-items-center\"],[9],[0,\"\\n  \"],[1,[27,\"content-card/image\",null,[[\"title\",\"src\",\"alt\",\"focalpoint\",\"isLogo\"],[[23,[\"name\"]],[23,[\"image\",\"src\"]],[23,[\"image\",\"alt\"]],[23,[\"image\",\"focalpoint\"]],[23,[\"isLogo\"]]]]],false],[0,\"\\n\\n\"],[4,\"content/edit-link\",null,[[\"contentId\",\"type\"],[[23,[\"contentId\"]],[23,[\"type\"]]]],{\"statements\":[[0,\"    \"],[1,[27,\"content-card/image-overlay\",null,[[\"type\",\"status\"],[[23,[\"type\"]],[23,[\"statusText\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/content-card/image-cap.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/content-card/image-overlay", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "hpRVLvXh",
    "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"d-flex justify-content-between\"],[9],[0,\"\\n  \"],[1,[27,\"content/status-badge\",null,[[\"status\"],[[23,[\"status\"]]]]],false],[0,\"\\n  \"],[1,[27,\"content/type-badge\",null,[[\"type\"],[[23,[\"type\"]]]]],false],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/content-card/image-overlay.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/content-card/image-placeholder", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "jUAriJxn",
    "block": "{\"symbols\":[],\"statements\":[[1,[27,\"entypo-icon\",[[23,[\"icon\"]]],[[\"class\"],[\"text-white opacity-6 display-2\"]]],false],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/content-card/image-placeholder.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/content-card/image", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "TSoSMHcf",
    "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[23,[\"src\"]]],null,{\"statements\":[[4,\"if\",[[23,[\"isLogo\"]]],null,{\"statements\":[[0,\"    \"],[1,[27,\"imgix-img\",null,[[\"class\",\"originalSrc\",\"alt\",\"title\",\"auto\",\"fit\",\"w\",\"h\"],[\"card-img-top img-fluid\",[23,[\"src\"]],[23,[\"alt\"]],[23,[\"title\"]],\"format\",\"clip\",\"480\",\"270\"]]],false],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[1,[27,\"imgix-img\",null,[[\"class\",\"originalSrc\",\"alt\",\"title\",\"auto\",\"crop\",\"fp-x\",\"fp-y\",\"fit\",\"w\",\"h\"],[\"card-img-top img-fluid\",[23,[\"src\"]],[23,[\"alt\"]],[23,[\"title\"]],\"format\",\"focalpoint\",[23,[\"focalpoint\",\"x\"]],[23,[\"focalpoint\",\"y\"]],\"crop\",\"480\",\"270\"]]],false],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[1,[27,\"content-card/image-placeholder\",null,[[\"class\"],[\"card-img-top img-fluid\"]]],false],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/content-card/image.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/content-card/user-attribution", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "aXLXtGPc",
    "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[23,[\"show\"]]],null,{\"statements\":[[0,\"  \"],[1,[27,\"entypo-icon\",[\"clock\"],[[\"class\"],[\"mr-1\"]]],false],[0,\"\\n  \"],[7,\"div\"],[9],[0,\"\\n    \"],[1,[21,\"label\"],false],[0,\"\\n\"],[4,\"if\",[[23,[\"fromNow\"]]],null,{\"statements\":[[0,\"      \"],[7,\"abbr\"],[12,\"title\",[23,[\"dateDisplay\",\"title\"]]],[9],[1,[23,[\"dateDisplay\",\"value\"]],false],[3,\"action\",[[22,0,[]],\"toggleDates\"]],[10],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[23,[\"username\"]]],null,{\"statements\":[[0,\"      by \"],[1,[21,\"username\"],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[10],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/content-card/user-attribution.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/content/browse/left-menu", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "BEZTXjDp",
    "block": "{\"symbols\":[\"tab\",\"tab\",\"tabContent\"],\"statements\":[[7,\"div\"],[11,\"class\",\"tab-wrapper bg-secondary\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"tabs\"]]],null,{\"statements\":[[4,\"content/browse/left-menu/tab-content\",null,[[\"activeTabKey\",\"tab\",\"facets\",\"selectedContentTypes\",\"on-content-type-click\",\"on-content-type-clear\",\"on-close\"],[[23,[\"activeTab\",\"key\"]],[22,2,[]],[23,[\"facets\"]],[23,[\"selectedContentTypes\"]],[23,[\"on-content-type-click\"]],[23,[\"on-content-type-clear\"]],[27,\"action\",[[22,0,[]],\"close\"],null]]],{\"statements\":[[0,\"      \"],[1,[27,\"get\",[[22,3,[]],[22,2,[\"key\"]]],null],false],[0,\"\\n\"]],\"parameters\":[3]},null]],\"parameters\":[2]},null],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"class\",\"tab-seperator\"],[9],[10],[0,\"\\n\\n\"],[7,\"div\"],[11,\"class\",\"tabs d-flex flex-column\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"tabs\"]]],null,{\"statements\":[[4,\"content/browse/left-menu/button\",null,[[\"title\",\"for\",\"activeTab\",\"on-click\"],[[22,1,[\"title\"]],[22,1,[\"key\"]],[23,[\"activeTab\",\"key\"]],[27,\"action\",[[22,0,[]],\"setActiveTabKey\"],null]]],{\"statements\":[[0,\"      \"],[1,[27,\"entypo-icon\",[[22,1,[\"icon\"]]],[[\"class\"],[\"text-white h2\"]]],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[1]},null],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/content/browse/left-menu.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/content/browse/left-menu/button", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "+0SPhimk",
    "block": "{\"symbols\":[\"&default\"],\"statements\":[[14,1],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/content/browse/left-menu/button.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/content/browse/left-menu/tab-content", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "ZlDq5nD8",
    "block": "{\"symbols\":[\"&default\"],\"statements\":[[7,\"div\"],[11,\"class\",\"d-flex justify-content-between align-items-start\"],[9],[0,\"\\n  \"],[7,\"h3\"],[9],[1,[23,[\"tab\",\"title\"]],false],[10],[0,\"\\n  \"],[7,\"button\"],[11,\"class\",\"close\"],[11,\"type\",\"button\"],[9],[0,\"\\n    \"],[1,[27,\"entypo-icon\",[\"cross\"],null],false],[0,\"\\n  \"],[3,\"action\",[[22,0,[]],\"close\"]],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[14,1,[[27,\"hash\",null,[[\"content-types\",\"dates\",\"scheduling\",\"status\",\"taxonomy\"],[[27,\"component\",[\"content/browse/left-menu/tab-content/content-types\"],[[\"facets\",\"selected\",\"on-click\",\"on-clear\"],[[23,[\"facets\"]],[23,[\"selectedContentTypes\"]],[27,\"action\",[[22,0,[]],[23,[\"on-content-type-click\"]]],null],[27,\"action\",[[22,0,[]],[23,[\"on-content-type-clear\"]]],null]]]],[27,\"component\",[\"content/browse/left-menu/tab-content/dates\"],null],[27,\"component\",[\"content/browse/left-menu/tab-content/scheduling\"],null],[27,\"component\",[\"content/browse/left-menu/tab-content/status\"],null],[27,\"component\",[\"content/browse/left-menu/tab-content/taxonomy\"],null]]]]]],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/content/browse/left-menu/tab-content.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/content/browse/left-menu/tab-content/content-types", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "LlE0UeCc",
    "block": "{\"symbols\":[\"facet\"],\"statements\":[[7,\"div\"],[11,\"class\",\"card\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"card-header d-flex justify-content-between align-items-center\"],[9],[0,\"\\n    \"],[7,\"small\"],[9],[0,\"Selected: \"],[1,[23,[\"selected\",\"length\"]],false],[10],[0,\"\\n    \"],[7,\"button\"],[11,\"class\",\"btn btn-sm btn-secondary z-depth-0\"],[12,\"disabled\",[21,\"clearDisabled\"]],[9],[0,\"\\n      clear\\n    \"],[3,\"action\",[[22,0,[]],[23,[\"on-clear\"]]]],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"list-group list-group-flush\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"facets\"]]],null,{\"statements\":[[0,\"      \"],[1,[27,\"content/browse/left-menu/tab-content/content-types/button\",null,[[\"key\",\"name\",\"count\",\"selected\",\"on-click\"],[[22,1,[\"key\"]],[22,1,[\"name\"]],[22,1,[\"count\"]],[23,[\"selected\"]],[23,[\"on-click\"]]]]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[10],[0,\"\\n\"],[10]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/content/browse/left-menu/tab-content/content-types.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/content/browse/left-menu/tab-content/content-types/button", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "RsXu1Zy0",
    "block": "{\"symbols\":[],\"statements\":[[7,\"span\"],[9],[1,[21,\"name\"],false],[10],[0,\"\\n\"],[7,\"span\"],[11,\"class\",\"badge badge-pill\"],[9],[1,[27,\"format-number\",[[23,[\"count\"]],\"0,0\"],null],false],[10]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/content/browse/left-menu/tab-content/content-types/button.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/content/browse/left-menu/tab-content/dates", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "keP9aYiE",
    "block": "{\"symbols\":[\"calendar\"],\"statements\":[[7,\"select\"],[11,\"class\",\"custom-select\"],[9],[0,\"\\n  \\n\"],[10],[0,\"\\n\\n\"],[4,\"power-calendar-range\",null,[[\"center\",\"selected\",\"onCenterChange\",\"onSelect\"],[[23,[\"center\"]],[23,[\"range\"]],[27,\"action\",[[22,0,[]],[27,\"mut\",[[23,[\"center\"]]],null]],[[\"value\"],[\"moment\"]]],[27,\"action\",[[22,0,[]],\"setRange\"],[[\"value\"],[\"moment\"]]]]],{\"statements\":[[0,\"  \"],[1,[22,1,[\"nav\"]],false],[0,\"\\n  \"],[1,[22,1,[\"days\"]],false],[0,\"\\n\"]],\"parameters\":[1]},null]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/content/browse/left-menu/tab-content/dates.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/content/browse/left-menu/tab-content/scheduling", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "qfOqh35j",
    "block": "{\"symbols\":[],\"statements\":[],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/content/browse/left-menu/tab-content/scheduling.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/content/browse/left-menu/tab-content/status", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "YD45hRV6",
    "block": "{\"symbols\":[],\"statements\":[],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/content/browse/left-menu/tab-content/status.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/content/browse/left-menu/tab-content/taxonomy", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "Puhhbbb0",
    "block": "{\"symbols\":[],\"statements\":[],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/content/browse/left-menu/tab-content/taxonomy.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/content/create-btn", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "1jNCXfVZ",
    "block": "{\"symbols\":[],\"statements\":[[4,\"link-to\",[\"content.browse.create\"],[[\"tagName\",\"type\",\"class\"],[\"button\",\"button\",\"btn btn-success btn-circle btn-xl btn-content-create\"]],{\"statements\":[[0,\"  \"],[1,[27,\"entypo-icon\",[[23,[\"icon\"]]],null],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/content/create-btn.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/content/edit-link", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "6viklSMU",
    "block": "{\"symbols\":[\"&default\"],\"statements\":[[4,\"link-to\",[\"content.edit\",[23,[\"dasherizedType\"]],[23,[\"contentId\"]]],[[\"class\",\"title\"],[[23,[\"class\"]],[23,[\"title\"]]]],{\"statements\":[[0,\"  \"],[14,1],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/content/edit-link.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/content/queue-btn", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "LKjxr/8h",
    "block": "{\"symbols\":[],\"statements\":[[7,\"button\"],[12,\"class\",[28,[\"btn btn-primary dropdown-toggle \",[21,\"class\"]]]],[11,\"data-toggle\",\"dropdown\"],[11,\"aria-haspopup\",\"true\"],[11,\"aria-expanded\",\"false\"],[11,\"type\",\"button\"],[9],[0,\"\\n  Queued: \"],[1,[21,\"count\"],false],[0,\"\\n\"],[10],[0,\"\\n\"],[7,\"div\"],[11,\"class\",\"dropdown-menu\"],[9],[0,\"\\n  \"],[7,\"h6\"],[11,\"class\",\"dropdown-header text-default d-flex justify-content-between\"],[9],[0,\"\\n    Export\\n    \"],[1,[27,\"entypo-icon\",[\"export\"],null],false],[0,\"\\n  \"],[10],[0,\"\\n\"],[0,\"  \"],[7,\"a\"],[11,\"class\",\"dropdown-item\"],[11,\"href\",\"#!\"],[9],[0,\"InDesign (Default)\"],[10],[0,\"\\n  \"],[7,\"a\"],[11,\"class\",\"dropdown-item\"],[11,\"href\",\"#!\"],[9],[0,\"InDesign (Products)\"],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"dropdown-divider\"],[9],[10],[0,\"\\n  \"],[7,\"a\"],[11,\"class\",\"dropdown-item d-flex justify-content-between\"],[11,\"href\",\"#!\"],[9],[0,\"\\n    \"],[7,\"span\"],[9],[0,\"Clear Queue\"],[10],[0,\"\\n    \"],[1,[27,\"entypo-icon\",[\"cross\"],null],false],[0,\"\\n  \"],[3,\"action\",[[22,0,[]],[23,[\"onClear\"]]]],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/content/queue-btn.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/content/status-badge", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "PCuCnf90",
    "block": "{\"symbols\":[],\"statements\":[[1,[21,\"status\"],false],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/content/status-badge.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/content/type-badge", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "qzTWOKmo",
    "block": "{\"symbols\":[],\"statements\":[[1,[21,\"type\"],false],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/content/type-badge.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/fetch-more", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "V09eoZ+L",
    "block": "{\"symbols\":[\"&default\"],\"statements\":[[14,1,[[27,\"hash\",null,[[\"nodes\",\"hasNextPage\",\"isFetching\",\"actions\"],[[23,[\"nodes\"]],[23,[\"hasNextPage\"]],[23,[\"isFetching\"]],[27,\"hash\",null,[[\"loadMore\"],[[27,\"action\",[[22,0,[]],\"fetchMore\"],null]]]]]]]]],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/fetch-more.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/loading-badge", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "Z3fZx0WQ",
    "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[23,[\"isLoading\"]]],null,{\"statements\":[[0,\"  \"],[7,\"div\"],[11,\"class\",\"badge badge-pill bg-light text-default opacity-6 z-depth-1\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"d-flex align-items-center\"],[9],[0,\"\\n      \"],[7,\"span\"],[11,\"class\",\"h2 mb-0\"],[9],[1,[27,\"entypo-icon\",[\"hour-glass\"],[[\"class\"],[\"d-inline-block spin mr-2\"]]],false],[10],[0,\"\\n      \"],[7,\"span\"],[11,\"class\",\"mr-2\"],[9],[0,\"Loading...\"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/loading-badge.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/loading-progress", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "lWe1MVwl",
    "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[23,[\"show\"]]],null,{\"statements\":[[0,\"  \"],[7,\"div\"],[12,\"class\",[28,[\"progress-bar progress-bar-striped \",[21,\"progressBackground\"],\" progress-bar-animated w-100\"]]],[11,\"role\",\"progressbar\"],[12,\"aria-valuenow\",[21,\"value\"]],[11,\"aria-valuemin\",\"0\"],[11,\"aria-valuemax\",\"100\"],[9],[0,\"\\n  \"],[10],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/loading-progress.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/nav/-content", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "wJE+Ayn3",
    "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[7,\"nav\"],[11,\"class\",\"navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white\"],[9],[0,\"\\n  \\n\"],[10]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/nav/-content.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/search-form", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "hyTrAZdx",
    "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"form-group mb-0\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"input-group input-group-alternative\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"input-group-prepend\"],[9],[0,\"\\n      \"],[7,\"span\"],[11,\"class\",\"input-group-text\"],[9],[1,[27,\"entypo-icon\",[\"magnifying-glass\"],null],false],[10],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"input\"],[11,\"class\",\"form-control\"],[11,\"placeholder\",\"Search\"],[11,\"type\",\"text\"],[9],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/search-form.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/components/user-nav", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "F4m3vd+2",
    "block": "{\"symbols\":[],\"statements\":[[7,\"li\"],[11,\"class\",\"nav-item dropdown\"],[9],[0,\"\\n  \"],[7,\"a\"],[11,\"class\",\"nav-link pl-3 pr-0\"],[11,\"href\",\"#\"],[11,\"role\",\"button\"],[11,\"data-toggle\",\"dropdown\"],[11,\"aria-haspopup\",\"true\"],[11,\"aria-expanded\",\"false\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"media align-items-center\"],[9],[0,\"\\n      \"],[7,\"span\"],[11,\"class\",\"avatar avatar-sm rounded-circle\"],[9],[0,\"\\n        \"],[7,\"img\"],[11,\"alt\",\"Image placeholder\"],[11,\"src\",\"https://secure.gravatar.com/avatar/38e23bf434e8ba27b96a726f5aa37e98\"],[9],[10],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"media-body ml-2 d-none d-lg-block\"],[9],[0,\"\\n        \"],[7,\"span\"],[11,\"class\",\"mb-0 text-sm  font-weight-bold\"],[9],[0,\"Jacob Bare\"],[10],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"dropdown-menu dropdown-menu-arrow dropdown-menu-right  z-depth-3\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"dropdown-header\"],[9],[0,\"\\n      \"],[7,\"h6\"],[11,\"class\",\"text-overflow m-0\"],[9],[0,\"Welcome!\"],[10],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"a\"],[11,\"href\",\"#\"],[11,\"class\",\"dropdown-item d-flex justify-content-between\"],[9],[0,\"\\n      \"],[7,\"span\"],[9],[0,\"My Profile\"],[10],[0,\"\\n      \"],[1,[27,\"entypo-icon\",[\"user\"],[[\"class\"],[\"ml-1\"]]],false],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"a\"],[11,\"href\",\"#\"],[11,\"class\",\"dropdown-item d-flex justify-content-between\"],[9],[0,\"\\n      \"],[7,\"span\"],[9],[0,\"Settings\"],[10],[0,\"\\n      \"],[1,[27,\"entypo-icon\",[\"cog\"],null],false],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"a\"],[11,\"href\",\"#\"],[11,\"class\",\"dropdown-item d-flex justify-content-between\"],[9],[0,\"\\n      \"],[7,\"span\"],[9],[0,\"Change Password\"],[10],[0,\"\\n      \"],[1,[27,\"entypo-icon\",[\"key\"],null],false],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"a\"],[11,\"href\",\"#\"],[11,\"class\",\"dropdown-item d-flex justify-content-between\"],[9],[0,\"\\n      \"],[7,\"span\"],[9],[0,\"Support\"],[10],[0,\"\\n      \"],[1,[27,\"entypo-icon\",[\"help-with-circle\"],null],false],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"dropdown-divider\"],[9],[10],[0,\"\\n    \"],[7,\"a\"],[11,\"href\",\"#\"],[11,\"class\",\"dropdown-item d-flex justify-content-between\"],[9],[0,\"\\n      \"],[7,\"span\"],[9],[0,\"Logout\"],[10],[0,\"\\n      \"],[1,[27,\"entypo-icon\",[\"log-out\"],null],false],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/components/user-nav.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/content", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "bdNF96dS",
    "block": "{\"symbols\":[],\"statements\":[[1,[21,\"loading-progress\"],false],[0,\"\\n\\n\"],[7,\"div\"],[11,\"class\",\"content\"],[9],[0,\"\\n  \"],[1,[21,\"outlet\"],false],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/content.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/content/browse", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "ea8/wQpB",
    "block": "{\"symbols\":[\"fetch\",\"item\"],\"statements\":[[7,\"div\"],[11,\"class\",\"browse\"],[9],[0,\"\\n  \"],[7,\"nav\"],[11,\"class\",\"navbar navbar-dark\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"container-fluid\"],[9],[0,\"\\n\\n      \"],[7,\"a\"],[11,\"class\",\"navbar-brand\"],[9],[0,\"\\n        \"],[7,\"img\"],[12,\"src\",[28,[\"/\",[21,\"rootURL\"],\"logo-default.png\"]]],[11,\"alt\",\"BaseCMS\"],[11,\"height\",\"30\"],[9],[10],[0,\"\\n      \"],[10],[0,\"\\n\\n\"],[0,\"      \"],[1,[21,\"search-form\"],false],[0,\"\\n\\n\"],[0,\"      \"],[1,[21,\"user-nav\"],false],[0,\"\\n\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\\n  \"],[7,\"section\"],[11,\"class\",\"list bg-browse mb-6\"],[9],[0,\"\\n\\n    \"],[7,\"div\"],[11,\"class\",\"header bg-gradient-primary pb-8 pt-5 pt-md-8\"],[9],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"separator separator-bottom separator-skew zindex-100\"],[9],[0,\"\\n        \"],[7,\"svg\"],[11,\"x\",\"0\"],[11,\"y\",\"0\"],[11,\"viewBox\",\"0 0 2560 100\"],[11,\"preserveAspectRatio\",\"none\"],[11,\"version\",\"1.1\"],[11,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[9],[0,\"\\n          \"],[7,\"polygon\"],[11,\"class\",\"fill-browse\"],[11,\"points\",\"2560 0 2560 100 0 100\"],[9],[10],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n\\n    \"],[7,\"div\"],[11,\"class\",\"container-fluid mt--8\"],[9],[0,\"\\n\"],[4,\"fetch-more\",null,[[\"query\",\"edges\",\"hasNextPage\",\"endCursor\",\"resultKey\"],[[23,[\"observable\"]],[23,[\"model\",\"edges\"]],[23,[\"model\",\"pageInfo\",\"hasNextPage\"]],[23,[\"model\",\"pageInfo\",\"endCursor\"]],\"allContent\"]],{\"statements\":[[0,\"        \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n\"],[4,\"each\",[[22,1,[\"nodes\"]]],null,{\"statements\":[[0,\"            \"],[1,[27,\"content-card\",null,[[\"content\",\"attributionType\",\"contentQueue\",\"onQueueChange\"],[[22,2,[]],[23,[\"attribution\"]],[23,[\"contentQueue\"]],[27,\"action\",[[22,0,[]],\"queue\"],null]]]],false],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"        \"],[10],[0,\"\\n\\n        \"],[1,[27,\"in-view\",null,[[\"on-viewport-enter\"],[[27,\"action\",[[22,0,[]],[22,1,[\"actions\",\"loadMore\"]]],null]]]],false],[0,\"\\n\"],[4,\"if\",[[22,1,[\"isFetching\"]]],null,{\"statements\":[[0,\"          \"],[7,\"div\"],[11,\"class\",\"sk-double-bounce mx-auto my-0\"],[9],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"sk-child sk-double-bounce1 bg-primary z-depth-1\"],[9],[10],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"sk-child sk-double-bounce2 bg-primary z-depth-1\"],[9],[10],[0,\"\\n          \"],[10],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[1]},null],[0,\"    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\\n  \"],[1,[27,\"content/browse/left-menu\",null,[[\"activeTabKey\",\"facets\",\"selectedContentTypes\",\"on-content-type-click\",\"on-content-type-clear\"],[[23,[\"active-tab\"]],[23,[\"facets\"]],[23,[\"selectedContentTypes\"]],[27,\"action\",[[22,0,[]],\"toggleContentTypes\"],null],[27,\"action\",[[22,0,[]],\"clearContentTypes\"],null]]]],false],[0,\"\\n\\n  \"],[7,\"div\"],[11,\"class\",\"footer-controls left\"],[9],[0,\"\\n    \"],[1,[21,\"btn-scroll-top\"],false],[0,\"\\n  \"],[10],[0,\"\\n\\n  \"],[7,\"div\"],[11,\"class\",\"footer-controls right\"],[9],[0,\"\\n    \"],[1,[21,\"content/create-btn\"],false],[0,\"\\n  \"],[10],[0,\"\\n\\n\"],[10],[0,\"\\n\\n\"],[1,[21,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/content/browse.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/content/browse/create", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "MGpmaR37",
    "block": "{\"symbols\":[\"modal\"],\"statements\":[[4,\"bs-modal\",null,[[\"show\",\"size\",\"backdrop\",\"contentClass\",\"onClose\"],[true,\"xl\",\"static\",\"bg-secondary\",[27,\"action\",[[22,0,[]],\"closeModal\"],null]]],{\"statements\":[[4,\"component\",[[27,\"-assert-implicit-component-helper-argument\",[[22,1,[\"header\"]],\"expected `modal.header` to be a contextual component but found a string. Did you mean `(component modal.header)`? ('@base-cms/manage/templates/content/browse/create.hbs' @ L9:C5) \"],null]],null,{\"statements\":[[0,\"    \"],[7,\"button\"],[11,\"class\",\"close\"],[11,\"aria-label\",\"Close\"],[11,\"type\",\"button\"],[9],[0,\"\\n      \"],[1,[27,\"entypo-icon\",[\"cross\"],null],false],[0,\"\\n    \"],[3,\"action\",[[22,0,[]],[22,1,[\"actions\",\"hide\"]]]],[10],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"component\",[[27,\"-assert-implicit-component-helper-argument\",[[22,1,[\"body\"]],\"expected `modal.body` to be a contextual component but found a string. Did you mean `(component modal.body)`? ('@base-cms/manage/templates/content/browse/create.hbs' @ L19:C5) \"],null]],[[\"class\"],[\"pt-0\"]],{\"statements\":[[0,\"    \"],[7,\"div\"],[11,\"class\",\"form-group mb-0\"],[9],[0,\"\\n      \"],[7,\"label\"],[11,\"for\",\"content.name\"],[9],[0,\"Name / Title\"],[10],[0,\"\\n      \"],[7,\"input\"],[11,\"id\",\"content.name\"],[11,\"class\",\"form-control form-control-lg form-control-alternative\"],[11,\"type\",\"text\"],[9],[10],[0,\"\\n    \"],[10],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[1]},null]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/content/browse/create.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/content/edit", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "mGCcCASQ",
    "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"main-content bg-content\"],[9],[0,\"\\n  \"],[7,\"nav\"],[11,\"class\",\"navbar navbar-top navbar-expand-md navbar-dark\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"container-fluid\"],[9],[0,\"\\n\\n\"],[4,\"link-to\",[\"content.browse.index\"],[[\"class\"],[\"h4 mb-0 text-white text-uppercase d-none d-lg-inline-block\"]],{\"statements\":[[0,\"        \"],[1,[27,\"entypo-icon\",[\"chevron-thin-left\"],null],false],[0,\" Browse\\n\"]],\"parameters\":[]},null],[0,\"\\n      \"],[7,\"form\"],[11,\"class\",\"navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto\"],[9],[0,\"\\n        \"],[7,\"div\"],[11,\"class\",\"form-group mb-0\"],[9],[0,\"\\n          \"],[7,\"div\"],[11,\"class\",\"input-group input-group-alternative\"],[9],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"input-group-prepend\"],[9],[0,\"\\n              \"],[7,\"span\"],[11,\"class\",\"input-group-text\"],[9],[1,[27,\"entypo-icon\",[\"magnifying-glass\"],null],false],[10],[0,\"\\n            \"],[10],[0,\"\\n            \"],[7,\"input\"],[11,\"class\",\"form-control\"],[11,\"placeholder\",\"Search\"],[11,\"type\",\"text\"],[9],[10],[0,\"\\n          \"],[10],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n\\n      \"],[7,\"ul\"],[11,\"class\",\"navbar-nav align-items-center d-none d-md-flex\"],[9],[0,\"\\n        \"],[7,\"li\"],[11,\"class\",\"nav-item dropdown\"],[9],[0,\"\\n          \"],[7,\"a\"],[11,\"class\",\"nav-link pr-0\"],[11,\"href\",\"#\"],[11,\"role\",\"button\"],[11,\"data-toggle\",\"dropdown\"],[11,\"aria-haspopup\",\"true\"],[11,\"aria-expanded\",\"false\"],[9],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"media align-items-center\"],[9],[0,\"\\n              \"],[7,\"span\"],[11,\"class\",\"avatar avatar-sm rounded-circle\"],[9],[0,\"\\n                \"],[7,\"img\"],[11,\"alt\",\"Image placeholder\"],[11,\"src\",\"https://secure.gravatar.com/avatar/38e23bf434e8ba27b96a726f5aa37e98\"],[9],[10],[0,\"\\n              \"],[10],[0,\"\\n              \"],[7,\"div\"],[11,\"class\",\"media-body ml-2 d-none d-lg-block\"],[9],[0,\"\\n                \"],[7,\"span\"],[11,\"class\",\"mb-0 text-sm  font-weight-bold\"],[9],[0,\"Jacob Bare\"],[10],[0,\"\\n              \"],[10],[0,\"\\n            \"],[10],[0,\"\\n          \"],[10],[0,\"\\n          \"],[7,\"div\"],[11,\"class\",\"dropdown-menu dropdown-menu-arrow dropdown-menu-right z-depth-2\"],[9],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"dropdown-header\"],[9],[0,\"\\n              \"],[7,\"h6\"],[11,\"class\",\"text-overflow m-0\"],[9],[0,\"Welcome!\"],[10],[0,\"\\n            \"],[10],[0,\"\\n            \"],[7,\"a\"],[11,\"href\",\"#\"],[11,\"class\",\"dropdown-item d-flex justify-content-between\"],[9],[0,\"\\n              \"],[7,\"span\"],[9],[0,\"My Profile\"],[10],[0,\"\\n              \"],[1,[27,\"entypo-icon\",[\"user\"],[[\"class\"],[\"ml-1\"]]],false],[0,\"\\n            \"],[10],[0,\"\\n            \"],[7,\"a\"],[11,\"href\",\"#\"],[11,\"class\",\"dropdown-item d-flex justify-content-between\"],[9],[0,\"\\n              \"],[7,\"span\"],[9],[0,\"Settings\"],[10],[0,\"\\n              \"],[1,[27,\"entypo-icon\",[\"cog\"],null],false],[0,\"\\n            \"],[10],[0,\"\\n            \"],[7,\"a\"],[11,\"href\",\"#\"],[11,\"class\",\"dropdown-item d-flex justify-content-between\"],[9],[0,\"\\n              \"],[7,\"span\"],[9],[0,\"Change Password\"],[10],[0,\"\\n              \"],[1,[27,\"entypo-icon\",[\"key\"],null],false],[0,\"\\n            \"],[10],[0,\"\\n            \"],[7,\"a\"],[11,\"href\",\"#\"],[11,\"class\",\"dropdown-item d-flex justify-content-between\"],[9],[0,\"\\n              \"],[7,\"span\"],[9],[0,\"Support\"],[10],[0,\"\\n              \"],[1,[27,\"entypo-icon\",[\"help-with-circle\"],null],false],[0,\"\\n            \"],[10],[0,\"\\n            \"],[7,\"div\"],[11,\"class\",\"dropdown-divider\"],[9],[10],[0,\"\\n            \"],[7,\"a\"],[11,\"href\",\"#\"],[11,\"class\",\"dropdown-item d-flex justify-content-between\"],[9],[0,\"\\n              \"],[7,\"span\"],[9],[0,\"Logout\"],[10],[0,\"\\n              \"],[1,[27,\"entypo-icon\",[\"log-out\"],null],false],[0,\"\\n            \"],[10],[0,\"\\n          \"],[10],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n\\n    \"],[10],[0,\"\\n\\n  \"],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"header content pb-8 pt-5 pt-lg-8 d-flex align-items-center\"],[12,\"style\",[28,[\"min-height: 600px; background-image: url(\",[23,[\"model\",\"primaryImage\",\"src\"]],\"); background-size: cover; background-position: center top;\"]]],[9],[0,\"\\n    \"],[7,\"span\"],[11,\"class\",\"mask bg-gradient-default opacity-7\"],[9],[10],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"container-fluid\"],[9],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n        \"],[7,\"div\"],[11,\"class\",\"col-lg-7 col-md-10\"],[9],[0,\"\\n          \"],[7,\"h1\"],[11,\"class\",\"display-2 text-white text-depth-1-half\"],[11,\"contenteditable\",\"true\"],[9],[1,[23,[\"model\",\"name\"]],false],[10],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n        \"],[7,\"div\"],[11,\"class\",\"col-lg-7 col-md-10\"],[9],[0,\"\\n          \"],[7,\"p\"],[11,\"class\",\"text-white text-depth-1\"],[11,\"contenteditable\",\"true\"],[9],[1,[23,[\"model\",\"teaser\"]],false],[10],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"row\"],[9],[0,\"\\n        \"],[7,\"div\"],[11,\"class\",\"col-lg-7 col-md-10 mb-5\"],[9],[0,\"\\n          \"],[7,\"span\"],[11,\"class\",\"badge badge-white bg-primary z-depth-half\"],[9],[0,\"\\n            \"],[7,\"h5\"],[11,\"class\",\"mb-0 text-white\"],[9],[1,[23,[\"model\",\"type\"]],false],[10],[0,\"\\n          \"],[10],[0,\"\\n        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"separator separator-bottom separator-skew zindex-100\"],[9],[0,\"\\n      \"],[7,\"svg\"],[11,\"x\",\"0\"],[11,\"y\",\"0\"],[11,\"viewBox\",\"0 0 2560 100\"],[11,\"preserveAspectRatio\",\"none\"],[11,\"version\",\"1.1\"],[11,\"xmlns\",\"http://www.w3.org/2000/svg\",\"http://www.w3.org/2000/xmlns/\"],[9],[0,\"\\n        \"],[7,\"polygon\"],[11,\"class\",\"fill-content\"],[11,\"points\",\"2560 0 2560 100 0 100\"],[9],[10],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\\n  \"],[7,\"div\"],[11,\"class\",\"container-fluid mt--8\"],[9],[0,\"\\n\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/content/edit.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/templates/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  var _default = Ember.HTMLBars.template({
    "id": "mR/h+zDV",
    "block": "{\"symbols\":[],\"statements\":[],\"hasEval\":false}",
    "meta": {
      "moduleName": "@base-cms/manage/templates/index.hbs"
    }
  });

  _exports.default = _default;
});
;define("@base-cms/manage/utils/date-utils", ["exports", "ember-power-calendar-moment/utils/date-utils"], function (_exports, _dateUtils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "default", {
    enumerable: true,
    get: function () {
      return _dateUtils.default;
    }
  });
});
;

;define('@base-cms/manage/config/environment', [], function() {
  var prefix = '@base-cms/manage';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("@base-cms/manage/app")["default"].create({"LOG_TRANSITIONS":true,"name":"@base-cms/manage","version":"0.4.0+1008f004"});
          }
        
//# sourceMappingURL=manage.map
