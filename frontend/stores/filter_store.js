var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher.js'),
    Constants = require('../constants/constants.js'),
    FilterStore = new Store(Dispatcher);

var _filters = {
  "mode": "0",
  "region": "0",
  "patch": "All time",
  "heroes": [],
  "radiant": [],
  "dire": []
};

var resetAllFilters = function () {
  _filters = {
    "mode": "0",
    "region": "0",
    "patch": "All time",
    "heroes": [],
    "radiant": [],
    "dire": []
  }
};

var receiveFilter = function (filterParams) {
  _filters[filterParams.filter] = filterParams.value;
};

var receiveHeroFilter = function (filterParams) {
  _filters[filterParams.filter].push(filterParams.value);
};

var removeHeroFilter = function (filterParams) {
  for (var i = 0; i < _filters[filterParams.filter].length; i++) {
    if (_filters[filterParams.filter][i] == filterParams.value) {
      _filters[filterParams.filter].splice(i, 1);
    }
  }
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
      receiveFilter(payload.filterParams);
      FilterStore.__emitChange();
      break;
    case Constants.SET_REGION_FILTER:
      receiveFilter(payload.filterParams);
      FilterStore.__emitChange();
      break;
    case Constants.SET_PATCH_FILTER:
      receiveFilter(payload.filterParams);
      FilterStore.__emitChange();
      break;
    case Constants.SET_HERO_FILTER:
      receiveHeroFilter(payload.filterParams);
      FilterStore.__emitChange();
      break;
    case Constants.REMOVE_HERO_FILTER:
      removeHeroFilter(payload.filterParams);
      FilterStore.__emitChange();
      break;
  }
};

module.exports = FilterStore;
