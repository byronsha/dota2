var ApiActions = require('../actions/api_actions.js');

var ApiUtil = {
  fetchAllMatches: function (callback, filters, spinnerCallback) {
    $.ajax({
      url: 'api/matches',
      data: { filters: JSON.stringify(filters) },
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
  },

  fetchHeroStats: function(callback, heroId) {
    $.ajax({
      url: 'api/heroes/' + heroId,
      success: function (stats) {
        callback(stats);
      }
    })
  },

  fetchInitialStats: function(callback) {
    $.ajax({
      url: 'api/statistics/',
      success: function (stats) {
        callback(stats);
      }
    })
  },

  fetchMatchDetails: function(callback, matchId) {
    $.ajax({
      url: 'api/matches/' + matchId,
      success: function (match) {
        callback(match);
      }
    })
  }
};

module.exports = ApiUtil;
