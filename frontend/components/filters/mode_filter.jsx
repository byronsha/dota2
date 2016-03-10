var React = require('react'),
    FilterStore = require('../../stores/filter_store.js'),
    FilterActions = require('../../actions/filter_actions.js'),
    GameModes = require('../../constants/game_modes.js');

var Filters = React.createClass({
  selectMode: function (e) {
    var filterParams = { filter: "mode", value: e.target.value }
    FilterActions.setModeFilter(filterParams);
  },
  render: function () {
    var that = this;

    return (
      <div>
        <select onChange={this.selectMode}>
          <option value="0">All</option>
          {
            Object.keys(GameModes).map(function (modeId, idx) {
              return (<option key={idx} value={modeId}>{GameModes[modeId]}</option>)
            })
          }
        </select>
      </div>
    )
  }
});

module.exports = Filters;
