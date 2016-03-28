var Dispatcher = require('../dispatcher/dispatcher.js'),
    Constants = require('../constants/constants.js'),
    ApiUtil = require('../util/api_util.js');

var ApiActions = {
  // Requests

  fetchAllMatches: function (filters, spinnerCallback) {
    ApiUtil.fetchAllMatches(ApiActions.receiveAllMatches, filters, spinnerCallback);
  },
  fetchAllHeroes: function () {
    ApiUtil.fetchAllHeroes(ApiActions.receiveAllHeroes);
  },
  fetchAllItems: function () {
    ApiUtil.fetchAllItems(ApiActions.receiveAllItems);
  },
  fetchHeroStats: function (heroId, callback) {
    ApiUtil.fetchHeroStats(heroId, callback);
  },
  fetchInitialStats: function () {
    ApiUtil.fetchInitialStats(ApiActions.receiveInitialStats);
  },

  // Responses

  receiveAllMatches: function (matches) {
    Dispatcher.dispatch({
      actionType: Constants.ALL_MATCHES_RECEIVED,
      matches: matches
    });
  },
  receiveAllHeroes: function (heroes) {
    Dispatcher.dispatch({
      actionType: Constants.ALL_HEROES_RECEIVED,
      heroes: heroes
    });
  },
  receiveAllItems: function (items) {
    Dispatcher.dispatch({
      actionType: Constants.ALL_ITEMS_RECEIVED,
      items: items
    });
  },
  receiveInitialStats: function (stats) {
    Dispatcher.dispatch({
      actionType: Constants.INITIAL_STATS_RECEIVED,
      stats: stats
    });
  }
};

module.exports = ApiActions;
