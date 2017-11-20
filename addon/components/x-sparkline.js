import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/x-sparkline';

const makeMapFn = function(viewRange, dataStart, dataEnd, padding = 0) {
  const scale = (viewRange - padding) / (dataEnd - dataStart);
  return function(value) {
    return ((value - dataStart) * scale) + (padding / 2);
  };
};

export default Component.extend({
  layout,

  /**
   * The data points that will be drawn on the chart.
   * @type {[number]}
   */
  points: null,

  /**
   * Line width
   * @type {number}
   */
  lineWidth: 1,

  /**
   * Stroke style
   * @type {string}
   */
  strokeStyle: 'rgba(28, 162, 230, 1)',

  /**
   * Gradient start style
   * @type {string}
   */
  gradientStart: 'rgba(180, 230, 255, 1)',

  /**
   * Gradient end style
   * @type {string}
   */
  gradientEnd: 'rgba(180, 230, 255, 0)',

  /**
   * The vertical padding between the edge of the chart and the most extreme data points.
   * Without some padding, the most extreme points may clip.
   * @type {number}
   */
  vPad: 4,

  /**
   * Depending on your layout, you may need to manage chart width yourself and pass it in.
   * @return {number}
   */
  width: computed(function() {
    return parseInt(window.getComputedStyle(this.element).width);
  }).volatile(),

  /**
   * Depending on your layout, you may need to manage chart height yourself and pass it in.
   * @return {number}
   */
  height: computed(function() {
    return parseInt(window.getComputedStyle(this.element).height);
  }).volatile(),

  didRender() {
    const {
      points,
      strokeStyle,
      lineWidth,
      gradientStart,
      gradientEnd,
      vPad,
      width,
      height,
    } = this.getProperties([
      'points', 'strokeStyle', 'lineWidth', 'gradientStart', 'gradientEnd', 'vPad', 'width', 'height'
    ]);

    // No points? Short circuit.
    if (points === null) {
      return;
    }

    const canvas = this.element.childNodes[0];
    const ctx = canvas.getContext('2d');

    // Set size (doubled to support high res screens)
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = width * 2;
    canvas.height = height * 2;
    ctx.scale(2, 2);

    // Make map functions
    const mapX = makeMapFn(width, 0, points.length - 1);
    const yMax = Math.max.apply(Math.max, points);
    const yMin = Math.min.apply(Math.min, points);
    const mapY = makeMapFn(height, yMin, yMax, vPad);

    // Create the line path
    const line = new Path2D();
    line.moveTo(0, height - mapY(points[0]));
    for (let i = 1; i < points.length; i++) {
      line.lineTo(mapX(i), height - mapY(points[i]));
    }

    // Close the area path and apply gradient fill
    const area = new Path2D(line);
    area.lineTo(width, height);
    area.lineTo(0, height);

    // Apply gradient
    var gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, gradientStart);
    gradient.addColorStop(1, gradientEnd);
    ctx.fillStyle = gradient;
    ctx.fill(area);

    // Apply stroke
    ctx.lineJoin = 'round';
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.stroke(line);
  },

});
