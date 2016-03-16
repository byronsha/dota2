var React = require('react'),
    Row = require('react-bootstrap').Row,
    Col = require('react-bootstrap').Col,
    HeroList = require('./hero_list.jsx'),
    GfycatNames = require('../../constants/gfycat_names.js'),
    PrimaryStats = require('../../constants/primary_stats.js');

var HeroChart = React.createClass({
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
      <Col md={6}>
        <Row><h3>SELECT HEROES</h3></Row>
        <HeroList heroes={strength} title="Strength"/><br/>
        <HeroList heroes={agility} title="Agility"/><br/>
        <HeroList heroes={intelligence} title="Intelligence"/>
      </Col>
    )
  }
});

module.exports = HeroChart;
