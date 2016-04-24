var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher.js'),
    Constants = require('../constants/constants.js'),
    StatisticsStore = new Store(Dispatcher);

var _heroStats = {};
var _statistics = {
  "gamesPlayed": [],
  "winrates": []
};

var receiveInitialStats = function (stats) {
  _statistics["gamesPlayed"] = stats.games_played;
  _statistics["winrates"] = stats.winrates;
};

var receiveHeroStats = function (stats) {
  _heroStats[stats.id] = stats;
};

StatisticsStore.heroStats = function (id) {
  return _heroStats[id] || {};
};

StatisticsStore.gamesPlayed = function () {
  return _statistics["gamesPlayed"].slice();
};

StatisticsStore.winrates = function () {
  return _statistics["winrates"].slice();
};

StatisticsStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case Constants.INITIAL_STATS_RECEIVED:
      receiveInitialStats(payload.stats);
      StatisticsStore.__emitChange();
      break;
    case Constants.HERO_STATS_RECEIVED:
      receiveHeroStats(payload.stats);
      StatisticsStore.__emitChange();
      break;
  }
};

module.exports = StatisticsStore;
