var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher.js'),
    Constants = require('../constants/constants.js'),
    MatchStore = new Store(Dispatcher);

var _matches = [];

var receiveAllMatches = function (matches) {
  _matches = matches;
}

MatchStore.all = function () {
  return _matches.slice();
};

MatchStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case Constants.ALL_MATCHES_RECEIVED:
      receiveAllMatches(payload.matches);
      MatchStore.__emitChange();
      break;
  }
};

module.exports = MatchStore;
