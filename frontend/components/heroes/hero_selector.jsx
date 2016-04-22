var React = require('react'),
    HeroList = require('./hero_list.jsx'),
    SelectedHeroes = require('./selected_heroes.jsx'),
    PrimaryStats = require('../../constants/primary_stats.js'),
    Row = require('react-bootstrap').Row;

var HeroSelector = React.createClass({
  getInitialState: function () {
    return {
      stat: "Strength"
    }
  },

  handleClick: function (stat) {
    this.setState({ stat: stat });
  },

  renderHeroList: function () {
    heroes = [];

    for (var i = 0; i < this.props.heroes.length; i++) {
      if (PrimaryStats[this.props.heroes[i].name] == this.state.stat ) {
        heroes.push(this.props.heroes[i]);
      }
    };

    return (
      <HeroList heroes={heroes} title={this.state.stat} filters={this.props.filters} loading={this.props.loading}/>
    )
  },

  renderButton: function (stat) {
    let statClass = this.colors[stat];

    if (this.state.stat == stat) {
      statClass += ' selected-stat';
    };

    return (
      <span onClick={this.handleClick.bind(null, stat)} className={statClass} id="hero-list-header"><img id="stat-icon" src={this.icons[stat]}></img>{stat}</span>
    )
  },

  render: function () {
    return (
      <Row className="hero-selector">
        {this.renderButton("Strength")}
        {this.renderButton("Agility")}
        {this.renderButton("Intelligence")}
        {this.renderHeroList()}

        <SelectedHeroes heroes={this.props.filters.heroes.slice()}/>
      </Row>
    )
  },

  icons: {
    "Strength": "http://images.akamai.steamusercontent.com/ugc/577904070808139756/3576D33C5276E049213C6833FDFF09838ED41A32/",
    "Agility": "http://images.akamai.steamusercontent.com/ugc/577904070808154460/C57BDD6E75C20265FFA9F196A1299BA18BB7E289/",
    "Intelligence": "http://www.dotadatabase.net/Content/icon_int.png"
  },

  colors: {
    "Strength": "red",
    "Agility": "green",
    "Intelligence": ""
  }
});

module.exports = HeroSelector;
