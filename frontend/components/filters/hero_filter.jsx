var React = require('react'),
    FilterActions = require('../../actions/filter_actions.js'),
    FilterStore = require('../../stores/filter_store.js'),
    HeroStore = require('../../stores/hero_store.js'),
    HeroDropdown = require('./hero_dropdown.jsx'),
    Button = require('react-bootstrap').Button;

var HeroFilter = React.createClass({
  resetAllFilters: function () {
    FilterActions.resetAllFilters();
  },

  render: function () {
    var that = this;
    var heroes = this.props.heroes;
    var slots = Object.keys(this.props.filters);

    return (
      <div>
        <ul className="horizontal">
          {
            slots.map(function(slot, idx) {
              var hero = HeroStore.findById(that.props.filters[slot]) || {name: "All"};
              return (
                <li key={idx}><HeroDropdown filter="heroes" slot={slot} heroes={heroes} hero={hero}/></li>
              )
            })
          }
        </ul>
        <Button onClick={this.resetAllFilters} bsSize="xsmall">reset all</Button>
      </div>
    )
  }
});

module.exports = HeroFilter;
