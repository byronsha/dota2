var ApiActions = require('../actions/api_actions.js');

var ApiUtil = {
  fetchAllMatches: function (callback, filters, spinnerCallback) {
    $.ajax({
      url: 'api/matches',
      data: { filters: filters },
      success: function (matches) {
        spinnerCallback();
        callback(matches);
      }
    })
  },
  fetchAllHeroes: function (callback) {
    $.ajax({
      url: 'api/heroes',
      success: function (heroes) {
        callback(heroes);
      }
    })
  },
  fetchAllItems: function (callback) {
    $.ajax({
      url: 'api/items',
      success: function (items) {
        callback(items);
      }
    })
  }
};

module.exports = ApiUtil;
