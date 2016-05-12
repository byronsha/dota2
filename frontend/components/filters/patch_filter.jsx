var React = require('react'),
    FilterStore = require('../../stores/filter_store.js'),
    FilterActions = require('../../actions/filter_actions.js'),
    Row = require('react-bootstrap').Row;

var PatchFilter = React.createClass({
  selectPatch: function (e) {
    var filterParams = { filter: "patch", value: e.target.innerHTML }
    FilterActions.setPatchFilter(filterParams);
  },

  render: function () {
    var patch = this.props.patch;

    return (
      <span id="patch-filter">
        <span className={patch == "6.87" ? "selected-patch" : ""} onClick={this.selectPatch}>6.87</span>
        <span className={patch == "6.86" ? "selected-patch" : ""} onClick={this.selectPatch}>6.86</span>
        <span className={patch == "All" ? "selected-patch" : ""} onClick={this.selectPatch}>All</span>
      </span>
    )
  }
});

module.exports = PatchFilter;
