var React = require('react'),
    FilterActions = require('../../actions/filter_actions.js');

var ResetHeroesButton = React.createClass({
  resetAllFilters: function () {
    FilterActions.resetAllFilters();
  },

  render: function () {
    return (
      <div className="reset-heroes-button"><span onClick={this.resetAllFilters}>RESET</span></div>
    )
  }
});

module.exports = ResetHeroesButton;
