import Component from '@ember/component';

export default Component.extend({
  classNames: ['modal-header'],
  title: null,
  showClose: true,

  titleComponent: 'bs-modal/title',
  closeComponent: 'bs-modal/close-icon'
});
