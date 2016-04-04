var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher.js'),
    Constants = require('../constants/constants.js'),
    MatchStore = new Store(Dispatcher);

var _matches = [];
var _matchDetails = {};

var receiveAllMatches = function (matches) {
  _matches = matches;
}

var receiveMatchDetails = function (match) {
  _matchDetails[match.id] = match.players;
}

MatchStore.all = function () {
  return _matches.slice();
};

MatchStore.matchDetails = function (matchId) {
  return _matchDetails[matchId] || [];
};

MatchStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case Constants.ALL_MATCHES_RECEIVED:
      receiveAllMatches(payload.matches);
      MatchStore.__emitChange();
      break;
    case Constants.MATCH_DETAILS_RECEIVED:
      receiveMatchDetails(payload.match);
      MatchStore.__emitChange();
      break;
  }
};

module.exports = MatchStore;
