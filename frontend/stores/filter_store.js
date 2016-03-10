var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher.js'),
    Constants = require('../constants/constants.js'),
    FilterStore = new Store(Dispatcher);

var _filters = {
  "mode": "0",
  "heroes": {
    "first": "0",
    "second": "0",
    "third": "0",
    "fourth": "0",
    "fifth": "0",
  },
  "radiant": {
    "first": "0",
    "second": "0",
    "third": "0",
    "fourth": "0",
    "fifth": "0",
  },
  "dire": {
    "first": "0",
    "second": "0",
    "third": "0",
    "fourth": "0",
    "fifth": "0",
  }
};

var resetAllFilters = function () {
  _filters = {
    "mode": "0",
    "heroes": {"first": "0", "second": "0", "third": "0", "fourth": "0", "fifth": "0"},
    "radiant": { "first": "0", "second": "0", "third": "0", "fourth": "0", "fifth": "0"},
    "dire": { "first": "0", "second": "0", "third": "0", "fourth": "0", "fifth": "0"}
  }
};

var receiveModeFilter = function (filterParams) {
  _filters[filterParams.filter] = filterParams.value;
};

var receiveHeroFilter = function (filterParams) {
  _filters[filterParams.filter][filterParams.slot] = filterParams.value;
};

FilterStore.all = function () {
  return _filters;
};

FilterStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case Constants.RESET_ALL_FILTERS:
      resetAllFilters();
      FilterStore.__emitChange();
      break;
    case Constants.SET_MODE_FILTER:
      receiveModeFilter(payload.filterParams);
      FilterStore.__emitChange();
      break;
    case Constants.SET_HERO_FILTER:
      receiveHeroFilter(payload.filterParams);
      FilterStore.__emitChange();
      break;
  }
};

module.exports = FilterStore;
