import Browser from '@base-cms/marko-web/browser';

// Register custom Vue components here...
/*
import SomeComponent from './some-component.vue';

Browser.registerComponent('SomeComponentName', SomeComponent);

This component would now be loadable within server-side templates via.
<cms-browser-component name="SomeComponentName" props={ someProp: 'someValue' } />

If you need to access Vue or jQuery within a browser component you may
do so by importing them from the core web library:

import Vue from '@base-cms/marko-web/browser/vue';
import $ from '@base-cms/marko-web/browser/jquery';

*/

export default Browser;
