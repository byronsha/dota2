var React = require('react'),
    FilterStore = require('../../stores/filter_store.js'),
    FilterActions = require('../../actions/filter_actions.js');

var HeroDropdown = React.createClass({
  selectHero: function (e) {
    var filterParams = {
      filter: this.props.filter,
      slot: this.props.slot,
      value: e.target.value
    }
    FilterActions.setHeroFilter(filterParams);
  },

  render: function () {
    var that = this;

    return (
      <div>
        <select onChange={this.selectHero}>
          <option value="0">All</option>
          {
            this.props.heroes.map(function (hero, idx) {
              return (
                <option key={idx} value={hero.id}>{hero.name}</option>
              )
            })
          }
        </select>
      </div>
    )
  }
});

module.exports = HeroDropdown;
