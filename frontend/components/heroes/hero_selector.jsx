var React = require('react'),
    HeroList = require('./hero_list.jsx'),
    SelectedHeroes = require('./selected_heroes.jsx'),
    ResetHeroesButton = require('./reset_heroes_button.jsx'),
    PrimaryStats = require('../../constants/primary_stats.js'),
    Row = require('react-bootstrap').Row;

var HeroSelector = React.createClass({
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
      <div className="hero-selector">
        <Row><h2 className="chart-header">SELECT YOUR HEROES</h2></Row>
        <SelectedHeroes heroes={this.props.filters.heroes.slice()}/>
        <ResetHeroesButton/>
        <HeroList heroes={strength} title="STRENGTH" filters={this.props.filters} loading={this.props.loading}/>
        <HeroList heroes={agility} title="AGILITY" filters={this.props.filters} loading={this.props.loading}/>
        <HeroList heroes={intelligence} title="INTELLIGENCE" filters={this.props.filters} loading={this.props.loading}/>
      </div>
    )
  }
});

module.exports = HeroSelector;
