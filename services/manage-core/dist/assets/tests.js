'use strict';

define("@base-cms/manage/tests/helpers/ember-power-calendar", ["exports", "ember-power-calendar/test-support"], function (_exports, _testSupport) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;

  function _default() {
    Ember.Test.registerAsyncHelper('calendarCenter', async function (app, selector, newCenter) {
      return (0, _testSupport.calendarCenter)(selector, newCenter);
    });
    Ember.Test.registerAsyncHelper('calendarSelect', async function (app, selector, selected) {
      return (0, _testSupport.calendarSelect)(selector, selected);
    });
  }
});
define("@base-cms/manage/tests/lint/app.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | app');
  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });
  QUnit.test('components/bs-modal.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/bs-modal.js should pass ESLint\n\n');
  });
  QUnit.test('components/bs-modal/body.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/bs-modal/body.js should pass ESLint\n\n');
  });
  QUnit.test('components/bs-modal/dialog.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/bs-modal/dialog.js should pass ESLint\n\n');
  });
  QUnit.test('components/bs-modal/footer.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/bs-modal/footer.js should pass ESLint\n\n');
  });
  QUnit.test('components/bs-modal/header.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/bs-modal/header.js should pass ESLint\n\n');
  });
  QUnit.test('components/bs-modal/wrapper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/bs-modal/wrapper.js should pass ESLint\n\n');
  });
  QUnit.test('components/btn-scroll-top.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/btn-scroll-top.js should pass ESLint\n\n');
  });
  QUnit.test('components/content-card.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/content-card.js should pass ESLint\n\n');
  });
  QUnit.test('components/content-card/image-cap.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/content-card/image-cap.js should pass ESLint\n\n');
  });
  QUnit.test('components/content-card/image-overlay.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/content-card/image-overlay.js should pass ESLint\n\n');
  });
  QUnit.test('components/content-card/image-placeholder.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/content-card/image-placeholder.js should pass ESLint\n\n');
  });
  QUnit.test('components/content-card/image.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/content-card/image.js should pass ESLint\n\n');
  });
  QUnit.test('components/content-card/user-attribution.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/content-card/user-attribution.js should pass ESLint\n\n');
  });
  QUnit.test('components/content/browse/left-menu.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/content/browse/left-menu.js should pass ESLint\n\n');
  });
  QUnit.test('components/content/browse/left-menu/button.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/content/browse/left-menu/button.js should pass ESLint\n\n');
  });
  QUnit.test('components/content/browse/left-menu/tab-content.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/content/browse/left-menu/tab-content.js should pass ESLint\n\n');
  });
  QUnit.test('components/content/browse/left-menu/tab-content/content-types.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/content/browse/left-menu/tab-content/content-types.js should pass ESLint\n\n');
  });
  QUnit.test('components/content/browse/left-menu/tab-content/content-types/button.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/content/browse/left-menu/tab-content/content-types/button.js should pass ESLint\n\n');
  });
  QUnit.test('components/content/browse/left-menu/tab-content/dates.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/content/browse/left-menu/tab-content/dates.js should pass ESLint\n\n');
  });
  QUnit.test('components/content/browse/left-menu/tab-content/scheduling.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/content/browse/left-menu/tab-content/scheduling.js should pass ESLint\n\n');
  });
  QUnit.test('components/content/browse/left-menu/tab-content/status.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/content/browse/left-menu/tab-content/status.js should pass ESLint\n\n');
  });
  QUnit.test('components/content/browse/left-menu/tab-content/taxonomy.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/content/browse/left-menu/tab-content/taxonomy.js should pass ESLint\n\n');
  });
  QUnit.test('components/content/create-btn.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/content/create-btn.js should pass ESLint\n\n');
  });
  QUnit.test('components/content/edit-link.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/content/edit-link.js should pass ESLint\n\n');
  });
  QUnit.test('components/content/queue-btn.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/content/queue-btn.js should pass ESLint\n\n');
  });
  QUnit.test('components/content/status-badge.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/content/status-badge.js should pass ESLint\n\n');
  });
  QUnit.test('components/content/type-badge.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/content/type-badge.js should pass ESLint\n\n');
  });
  QUnit.test('components/fetch-more.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/fetch-more.js should pass ESLint\n\n');
  });
  QUnit.test('components/imgix-img.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/imgix-img.js should pass ESLint\n\n');
  });
  QUnit.test('components/in-view.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/in-view.js should pass ESLint\n\n');
  });
  QUnit.test('components/loading-badge.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/loading-badge.js should pass ESLint\n\n');
  });
  QUnit.test('components/loading-progress.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/loading-progress.js should pass ESLint\n\n');
  });
  QUnit.test('components/nav/-content.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/nav/-content.js should pass ESLint\n\n');
  });
  QUnit.test('components/search-form.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/search-form.js should pass ESLint\n\n');
  });
  QUnit.test('components/user-nav.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/user-nav.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/content/browse.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/content/browse.js should pass ESLint\n\n');
  });
  QUnit.test('controllers/content/browse/create.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/content/browse/create.js should pass ESLint\n\n');
  });
  QUnit.test('helpers/format-number.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/format-number.js should pass ESLint\n\n');
  });
  QUnit.test('mixins/init-value-mixin.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/init-value-mixin.js should pass ESLint\n\n');
  });
  QUnit.test('mixins/loading-mixin.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/loading-mixin.js should pass ESLint\n\n');
  });
  QUnit.test('mixins/route-observable-mixin.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/route-observable-mixin.js should pass ESLint\n\n');
  });
  QUnit.test('mixins/send-event-mixin.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/send-event-mixin.js should pass ESLint\n\n');
  });
  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });
  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });
  QUnit.test('routes/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass ESLint\n\n');
  });
  QUnit.test('routes/content/browse.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/content/browse.js should pass ESLint\n\n');
  });
  QUnit.test('routes/content/edit.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/content/edit.js should pass ESLint\n\n');
  });
  QUnit.test('routes/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass ESLint\n\n');
  });
  QUnit.test('services/apollo.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/apollo.js should pass ESLint\n\n');
  });
  QUnit.test('services/global-events.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/global-events.js should pass ESLint\n\n');
  });
  QUnit.test('services/loading-display.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/loading-display.js should pass ESLint\n\n');
  });
  QUnit.test('services/mock-data.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/mock-data.js should pass ESLint\n\n');
  });
});
define("@base-cms/manage/tests/lint/templates.template.lint-test", [], function () {
  "use strict";

  QUnit.module('TemplateLint');
  QUnit.test('@base-cms/manage/templates/application.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/application.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/bs-modal.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/bs-modal.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/bs-modal/body.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/bs-modal/body.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/bs-modal/dialog.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/bs-modal/dialog.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/bs-modal/footer.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/bs-modal/footer.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/bs-modal/header.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/bs-modal/header.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/bs-modal/wrapper.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/bs-modal/wrapper.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/btn-scroll-top.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/btn-scroll-top.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/content-card.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/content-card.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/content-card/image-cap.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/content-card/image-cap.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/content-card/image-overlay.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/content-card/image-overlay.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/content-card/image-placeholder.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/content-card/image-placeholder.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/content-card/image.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/content-card/image.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/content-card/user-attribution.hbs', function (assert) {
    assert.expect(1);
    assert.ok(false, '@base-cms/manage/templates/components/content-card/user-attribution.hbs should pass TemplateLint.\n\n@base-cms/manage/templates/components/content-card/user-attribution.hbs\n  6:40  error  Interaction added to non-interactive element  no-invalid-interactive\n');
  });
  QUnit.test('@base-cms/manage/templates/components/content/browse/left-menu.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/content/browse/left-menu.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/content/browse/left-menu/button.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/content/browse/left-menu/button.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/content/browse/left-menu/tab-content.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/content/browse/left-menu/tab-content.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/content/browse/left-menu/tab-content/content-types.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/content/browse/left-menu/tab-content/content-types.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/content/browse/left-menu/tab-content/content-types/button.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/content/browse/left-menu/tab-content/content-types/button.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/content/browse/left-menu/tab-content/dates.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/content/browse/left-menu/tab-content/dates.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/content/browse/left-menu/tab-content/scheduling.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/content/browse/left-menu/tab-content/scheduling.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/content/browse/left-menu/tab-content/status.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/content/browse/left-menu/tab-content/status.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/content/browse/left-menu/tab-content/taxonomy.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/content/browse/left-menu/tab-content/taxonomy.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/content/create-btn.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/content/create-btn.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/content/edit-link.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/content/edit-link.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/content/queue-btn.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/content/queue-btn.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/content/status-badge.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/content/status-badge.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/content/type-badge.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/content/type-badge.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/fetch-more.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/fetch-more.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/loading-badge.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/loading-badge.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/loading-progress.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/loading-progress.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/nav/-content.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/nav/-content.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/search-form.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/search-form.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/components/user-nav.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/components/user-nav.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/content.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/content.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/content/browse.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/content/browse.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/content/browse/create.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/content/browse/create.hbs should pass TemplateLint.\n\n');
  });
  QUnit.test('@base-cms/manage/templates/content/edit.hbs', function (assert) {
    assert.expect(1);
    assert.ok(false, '@base-cms/manage/templates/content/edit.hbs should pass TemplateLint.\n\n@base-cms/manage/templates/content/edit.hbs\n  67:74  error  elements cannot have inline styles  no-inline-styles\n  67:74  error  Concatenated styles must be marked as `htmlSafe`.  style-concatenation\n');
  });
  QUnit.test('@base-cms/manage/templates/index.hbs', function (assert) {
    assert.expect(1);
    assert.ok(true, '@base-cms/manage/templates/index.hbs should pass TemplateLint.\n\n');
  });
});
define("@base-cms/manage/tests/lint/tests.lint-test", [], function () {
  "use strict";

  QUnit.module('ESLint | tests');
  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });
});
define("@base-cms/manage/tests/test-helper", ["@base-cms/manage/app", "@base-cms/manage/config/environment", "@ember/test-helpers", "ember-qunit"], function (_app, _environment, _testHelpers, _emberQunit) {
  "use strict";

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));
  (0, _emberQunit.start)();
});
define('@base-cms/manage/config/environment', [], function() {
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

require('@base-cms/manage/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
