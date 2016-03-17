var React = require('react'),
    Row = require('react-bootstrap').Row,
    Col = require('react-bootstrap').Col,
    HeroList = require('./hero_list.jsx'),
    HeroStore = require('../../stores/hero_store.js'),
    SelectedHeroStats = require('../heroes/selected_hero_stats.jsx'),
    GfycatNames = require('../../constants/gfycat_names.js'),
    PrimaryStats = require('../../constants/primary_stats.js');

var HeroSelector = React.createClass({
  getHeroPlayer: function () {
    if (this.props.match) {
      var id = this.props.filters.heroes[this.props.filters.heroes.length - 1];
      var players = this.props.match.radiant.concat(this.props.match.dire);

      for (var i = 0; i < players.length; i++) {
        if (players[i].hero_id == id) {
          return players[i];
        }
      }
    }
  },

  renderSelectedHeroStats: function () {
    var player = this.getHeroPlayer();

    if (typeof player == "undefined") {
      return <div/>;
    } else {
      var hero = HeroStore.findById(player.hero_id);
      return (
        <SelectedHeroStats hero={hero} player={player} match={this.props.match}/>
      );
    }
  },

  render: function () {
    var strength = [];
    var agility = [];
    var intelligence = [];

    for (var i = 0; i < this.props.heroes.length; i++) {
      var hero = this.props.heroes[i];
      if (PrimaryStats[hero.name] == "Strength") {
        strength.push(hero);
      } else if (PrimaryStats[hero.name] == "Agility") {
        agility.push(hero);
      } else if (PrimaryStats[hero.name] == "Intelligence") {
        intelligence.push(hero);
      }
    };

    return (
      <Row>
        <Col md={6}>
          <HeroList heroes={strength} title="Strength" filters={this.props.filters} loading={this.props.loading}/><br/>
          <HeroList heroes={agility} title="Agility" filters={this.props.filters} loading={this.props.loading}/><br/>
          <HeroList heroes={intelligence} title="Intelligence" filters={this.props.filters} loading={this.props.loading}/>
        </Col>

        <Col md={6}>
          {this.renderSelectedHeroStats()}
        </Col>
      </Row>
    )
  }
});

module.exports = HeroSelector;
