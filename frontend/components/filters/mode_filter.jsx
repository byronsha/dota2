var React = require('react'),
    FilterStore = require('../../stores/filter_store.js'),
    FilterActions = require('../../actions/filter_actions.js'),
    GameModes = require('../../constants/game_modes.js'),
    SplitButton = require('react-bootstrap').SplitButton,
    MenuItem = require('react-bootstrap').MenuItem;

var ModeFilter = React.createClass({
  selectMode: function (e, mode) {
    var filterParams = { filter: "mode", value: mode }
    FilterActions.setModeFilter(filterParams);
  },
  render: function () {
    var that = this;

    return (
      <SplitButton onSelect={this.selectMode} bsStyle="danger" title={GameModes[this.props.mode]} id="input-dropdown-addon">
          {
            Object.keys(GameModes).map(function (modeId, idx) {
              return (<MenuItem key={idx} eventKey={modeId}>{GameModes[modeId]}</MenuItem>)
            })
          }
      </SplitButton>
    )
  }
});

module.exports = ModeFilter;
