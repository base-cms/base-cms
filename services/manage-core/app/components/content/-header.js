import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({
  tagName: 'header',
  classNames: ['content-header'],
  attributeBindings: ['style'],

  backgroundImage: null,
  backgroundPosition: 'center',
  backgroundSize: 'cover',

  // background-image: url(https://upload.wikimedia.org/wikipedia/commons/6/6e/Veil_Nebula_-_NGC6960.jpg); background-size: cover; background-position: 50% 40%;

  style: computed('backgroundImage', 'backgroundPosition', 'backgroundSize', function() {
    const image = this.get('backgroundImage');
    if (!image || String(image).trim().indexOf('http') === -1) return null;
    const props = [
      [ 'background-image', `url(${image})` ],
      [ 'background-size', this.get('backgroundSize') || 'cover' ],
      [ 'background-position', this.get('backgroundPosition') || 'center' ],
    ];
    const style = props.map(([name, value]) => `${name}: ${value};`).join(' ');
    return htmlSafe(style);
  }).readOnly(),

});
