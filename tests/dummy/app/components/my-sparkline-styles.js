import Component from '@ember/component';
import layout from '../templates/components/my-sparkline-styles';

export default Component.extend({
  layout,
  tagName: '',
  points: null,
  isRising: Ember.computed('points', function() {
    const points = this.get('points');
    return points[points.length - 1] > points[0];
  }),
  strokeStyle: Ember.computed('isRising', function() {
    return this.get('isRising') ? 'rgba(28, 162, 230, 1)': 'rgba(255, 95, 95, 1)';
  }),
  gradientStart: Ember.computed('isRising', function() {
    return this.get('isRising') ? 'rgba(180, 230, 255, 1)': 'rgba(255, 195, 195, 1)';
  }),
  gradientEnd: Ember.computed('isRising', function() {
    return this.get('isRising') ? 'rgba(180, 230, 255, 0)': 'rgba(255, 195, 195, 0)';
  }),

});
