var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher.js'),
    Constants = require('../constants/constants.js'),
    HeroStore = new Store(Dispatcher);

var _heroes = [];

var receiveAllHeroes = function (heroes) {
  _heroes = heroes;
};

HeroStore.all = function () {
  return _heroes.slice();
};

HeroStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case Constants.ALL_HEROES_RECEIVED:
      receiveAllHeroes(payload.heroes);
      HeroStore.__emitChange();
      break;
  }
};

module.exports = HeroStore;
