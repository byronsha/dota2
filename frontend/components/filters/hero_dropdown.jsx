var React = require('react'),
    FilterStore = require('../../stores/filter_store.js'),
    FilterActions = require('../../actions/filter_actions.js'),
    DropdownButton = require('react-bootstrap').DropdownButton,
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
      <DropdownButton
        onSelect={this.selectHero}
        bsStyle="success"
        title={this.props.hero.name}
        id="hero-dropdown">
        {
          this.props.heroes.map(function (hero, idx) {
            return (
              <MenuItem key={idx} eventKey={hero.id}>{hero.name}</MenuItem>
            )
          })
        }
      </DropdownButton>
    );
  }
});

module.exports = HeroDropdown;
