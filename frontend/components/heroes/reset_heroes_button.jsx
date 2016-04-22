var React = require('react'),
    FilterActions = require('../../actions/filter_actions.js');

var ResetHeroesButton = React.createClass({
  resetAllFilters: function () {
    FilterActions.resetAllFilters();
  },

  render: function () {
    return (
      <li id="reset-heroes-button" onClick={this.resetAllFilters}></li>
    )
  }
});

module.exports = ResetHeroesButton;
