var Dispatcher = require('../dispatcher/dispatcher.js'),
    Constants = require('../constants/constants.js'),
    ApiUtil = require('../util/api_util.js');

var ApiActions = {
  // Requests

  fetchAllMatches: function (filters) {
    ApiUtil.fetchAllMatches(ApiActions.receiveAllMatches, filters);
  },
  fetchAllHeroes: function () {
    ApiUtil.fetchAllHeroes(ApiActions.receiveAllHeroes);
  },
  fetchAllItems: function () {
    ApiUtil.fetchAllItems(ApiActions.receiveAllItems);
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
  }
};

module.exports = ApiActions;
