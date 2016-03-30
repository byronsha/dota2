var React = require('react'),
    HeroList = require('./hero_list.jsx'),
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
        <Row><h2>Pick your team</h2></Row>
        <HeroList heroes={strength} title="Strength" filters={this.props.filters} loading={this.props.loading}/>
        <HeroList heroes={agility} title="Agility" filters={this.props.filters} loading={this.props.loading}/>
        <HeroList heroes={intelligence} title="Intelligence" filters={this.props.filters} loading={this.props.loading}/>
      </div>
    )
  }
});

module.exports = HeroSelector;
