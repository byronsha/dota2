var React = require('react'),
    FilterStore = require('../../stores/filter_store.js'),
    FilterActions = require('../../actions/filter_actions.js'),
    SplitButton = require('react-bootstrap').SplitButton,
    MenuItem = require('react-bootstrap').MenuItem;

var HeroDropdown = React.createClass({
  selectHero: function (e, hero) {
    var filterParams = {
      filter: this.props.filter,
      slot: this.props.slot,
      value: hero
    };

    FilterActions.setHeroFilter(filterParams);
  },

  render: function () {
    return (
      <SplitButton onSelect={this.selectHero} bsStyle="info" title={this.props.hero.name} id="hero-dropdown">
        <MenuItem eventKey="0">All</MenuItem>
          {
            this.props.heroes.map(function (hero, idx) {
              return (
                <MenuItem key={idx} eventKey={hero.id}>{hero.name}</MenuItem>
              )
            })
          }
      </SplitButton>
    );
  }
});

module.exports = HeroDropdown;
