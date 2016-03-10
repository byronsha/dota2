var Store = require('flux/utils').Store,
    Dispatcher = require('../dispatcher/dispatcher.js'),
    Constants = require('../constants/constants.js'),
    ItemStore = new Store(Dispatcher);

var _items = [];

var receiveAllItems = function (items) {
  _items = items;
};

ItemStore.all = function () {
  return _items.slice();
};

ItemStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case Constants.ALL_ITEMS_RECEIVED:
      receiveAllItems(payload.items);
      ItemStore.__emitChange();
      break;
  }
};

module.exports = ItemStore;
