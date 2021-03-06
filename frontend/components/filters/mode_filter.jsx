var React = require('react'),
    FilterStore = require('../../stores/filter_store.js'),
    FilterActions = require('../../actions/filter_actions.js'),
    GameModes = require('../../constants/game_modes.js'),
    DropdownButton = require('react-bootstrap').DropdownButton,
    MenuItem = require('react-bootstrap').MenuItem;

var ModeFilter = React.createClass({
  selectMode: function (e, mode) {
    var filterParams = { filter: "mode", value: mode }
    FilterActions.setModeFilter(filterParams);
  },

  render: function () {
    var that = this;

    return (
      <DropdownButton onSelect={this.selectMode} title={GameModes[this.props.mode]} id="mode-filter">
          {
            Object.keys(GameModes).map(function (modeId, idx) {
              return (<MenuItem key={idx} eventKey={modeId}>{GameModes[modeId]}</MenuItem>)
            })
          }
      </DropdownButton>
    )
  }
});

module.exports = ModeFilter;
