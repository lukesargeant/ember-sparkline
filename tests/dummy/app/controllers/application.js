import Controller from '@ember/controller';

export default Controller.extend({
  markets: [
    {
      website: 'apple.com',
      symbol: 'AAPL',
    },
    {
      website: 'microsoft.com',
      symbol: 'MSFT',
    },
    {
      website: 'facebook.com',
      symbol: 'FB',
    },
    {
      website: 'twitter.com',
      symbol: 'TWTR',
    },
    {
      website: 'adobe.com',
      symbol: 'ADBE',
    },
    {
      website: 'google.com',
      symbol: 'GOOG',
    },
  ]
});
