var React = require('react'),
    FilterActions = require('../../actions/filter_actions.js'),
    HeroDropdown = require('./hero_dropdown.jsx');

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
              return (
                <li key={idx}><HeroDropdown filter="heroes" slot={slot} heroes={heroes}/></li>
              )
            })
          }
        </ul>
        <span onClick={this.resetAllFilters}>reset all</span>
      </div>
    )
  }
});

module.exports = HeroFilter;
