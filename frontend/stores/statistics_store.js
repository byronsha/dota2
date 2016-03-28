var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher.js'),
    Constants = require('../constants/constants.js'),
    StatisticsStore = new Store(Dispatcher);

var _statistics = {
  "gamesPlayed": [],
  "winrates": []
};

var receiveInitialStats = function (stats) {
  _statistics["gamesPlayed"] = stats.games_played;
  _statistics["winrates"] = stats.winrates;
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
  }
};

module.exports = StatisticsStore;
