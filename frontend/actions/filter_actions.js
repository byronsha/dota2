var Dispatcher = require('../dispatcher/dispatcher.js'),
    Constants = require('../constants/constants.js');

var FilterActions = {
  setModeFilter: function (filterParams) {
    Dispatcher.dispatch({
      actionType: Constants.SET_MODE_FILTER,
      filterParams: filterParams
    });
  },
  setRegionFilter: function (filterParams) {
    Dispatcher.dispatch({
      actionType: Constants.SET_REGION_FILTER,
      filterParams: filterParams
    });
  },
  setPatchFilter: function (filterParams) {
    Dispatcher.dispatch({
      actionType: Constants.SET_PATCH_FILTER,
      filterParams: filterParams
    });
  },
  setHeroFilter: function (filterParams) {
    Dispatcher.dispatch({
      actionType: Constants.SET_HERO_FILTER,
      filterParams: filterParams
    });
  },
  removeHeroFilter: function (filterParams) {
    Dispatcher.dispatch({
      actionType: Constants.REMOVE_HERO_FILTER,
      filterParams: filterParams
    });
  },
  resetAllFilters: function () {
    Dispatcher.dispatch({
      actionType: Constants.RESET_ALL_FILTERS
    });
  }
};

module.exports = FilterActions;
