# ember-sparkline

This Ember Addon provides the x-sparkline component. Given an array of numbers, it
draws a line chart and an area chart using an html5 canvas. A subset of styles
can be passed in.

The dummy app illustrates how to transform appropriate data and how to rig up
styling.

x-sparkline simply draws an array of numbers, assuming the interval between each
point is the same. This means you can't draw a chart for data with non regular
intervals in the x axis.

Also note, you cannot provide a view range. Every point in the points array will
be drawn. If you only want to render a section of your data set, you'll need to
prepare/transform this in a wrapping component or your route.

## API

```
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
```

## Installation

* `git clone <repository-url>` this repository
* `cd ember-sparkline`
* `npm install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
