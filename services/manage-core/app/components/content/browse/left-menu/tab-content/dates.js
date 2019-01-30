import Component from '@ember/component';
import moment from 'moment';

export default Component.extend({
  center: null,
  range: null,

  init() {
    this._super(...arguments);
    this.set('options', [
      { key: 'published', label: 'Published' },
      { key: 'created', label: 'Created' },
      { key: 'updated', label: 'Updated' },
    ]);

    this.set('range', { start: null, end: null });
    const start = this.get('range.start');
    this.set('center', start || moment());
  },

  actions: {
    setRange(range) {
      this.set('range', range);
      // const { start, end } = range;
      // this.get('on-range-change')({
      //   start: start ? start.startOf('day').valueOf() : null,
      //   end: end ? end.endOf('day').valueOf() : null,
      // });
      // this.set('range.start', start ? start.startOf('day').valueOf() : null);
      // this.set('range.end', end ? end.endOf('day').valueOf() : null);
    },
  }
});