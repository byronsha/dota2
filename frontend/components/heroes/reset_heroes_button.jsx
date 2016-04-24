var React = require('react'),
    FilterActions = require('../../actions/filter_actions.js'),
    Col = require('react-bootstrap').Col;

var ResetHeroesButton = React.createClass({
  resetAllFilters: function () {
    FilterActions.resetAllFilters();
  },

  render: function () {
    return (
      <Col md={1} id="reset-heroes-button" onClick={this.resetAllFilters}></Col>
    )
  }
});

module.exports = ResetHeroesButton;
