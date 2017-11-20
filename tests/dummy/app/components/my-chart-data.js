import Component from '@ember/component';
import { run } from '@ember/runloop';
import layout from '../templates/components/my-chart-data';

export default Component.extend({
  layout,

  tagName: '',

  myPoints: null,

  symbol: '',

  isError: false,

  init() {
    this._super();
    const symbol = this.get('symbol');
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=HSB2BIZOVTGJRKAQ`).then((response) => {
        if (response.ok) {
          return response.json();
        }
    }).then((data) => {
      run(() => {
        try {
          let byTime = data['Time Series (5min)'];
          const viewData = Object.keys(byTime).map((key) => parseFloat(byTime[key]['4. close']));
          this.set('myPoints', viewData);
        } catch(e) {
          this.set('isError', true);
        }
      });
    });
  }
});
