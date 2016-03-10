var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher.js'),
    Constants = require('../constants/constants.js'),
    AbilityStore = new Store(Dispatcher);

var _abilities = [];

var receiveAllAbilities = function (abilities) {
  _abilities = abilities;
};

AbilityStore.all = function () {
  return _abilities.slice();
};

AbilityStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case Constants.ALL_ITEMS_RECEIVED:
      receiveAllAbilities(payload.abilities);
      AbilityStore.__emitChange();
      break;
  }
};

module.exports = AbilityStore;
