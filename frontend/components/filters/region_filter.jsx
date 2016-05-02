var React = require('react'),
    FilterStore = require('../../stores/filter_store.js'),
    FilterActions = require('../../actions/filter_actions.js'),
    GameModes = require('../../constants/game_modes.js'),
    Clusters = require('../../constants/clusters.js'),
    Regions = require('../../constants/regions.js'),
    DropdownButton = require('react-bootstrap').DropdownButton,
    MenuItem = require('react-bootstrap').MenuItem;

var RegionFilter = React.createClass({
  selectRegion: function (e, region) {
    var filterParams = { filter: "region", value: region }
    FilterActions.setRegionFilter(filterParams);
  },

  render: function () {
    var that = this;

    return (
      <DropdownButton onSelect={this.selectRegion} title={Clusters[this.props.region[0]]} id="mode-filter">
        {
          Object.keys(Regions).map(function (region, idx) {
            return (<MenuItem key={idx} eventKey={Regions[region]}>{region}</MenuItem>)
          })
        }
      </DropdownButton>
    )
  }
});

module.exports = RegionFilter;
