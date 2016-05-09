var React = require('react'),
    HeroStore = require('../../stores/hero_store.js'),
    SelectedHeroStats = require('../heroes/selected_hero_stats.jsx'),
    InitialStats = require('../heroes/initial_stats.jsx');

var Statistics = React.createClass({
  getHeroPlayer: function () {
    if (this.props.match) {
      var id = this.props.filters.heroes[this.props.filters.heroes.length - 1];
      var players = this.props.match.players;

      for (var i = 0; i < players.length; i++) {
        if (players[i].hero_id == id) {
          return players[i];
        }
      }
    }
  },

  renderStats: function () {
    var player = this.getHeroPlayer();

    if (typeof player == "undefined") {
      return <InitialStats patch={this.props.filters.patch}/>;
    } else {
      var hero = HeroStore.findById(player.hero_id);
      return <SelectedHeroStats hero={hero} player={player} match={this.props.match} patch={this.props.filters.patch}/>;
    }
  },

  render: function () {
    return (
      <div className="selected-hero-column">
        {this.renderStats()}
      </div>
    )
  }
});

module.exports = Statistics;
