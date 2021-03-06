var React = require('react'),
    HeroStore = require('../../stores/hero_store.js'),
    WinLossBar = require('./win_loss_bar.jsx'),
    Spinner = require('./spinner.jsx'),
    Row = require('react-bootstrap').Row;

var WinratesWithOtherHeroes = React.createClass({
  getXScale: function(props) {
    heroes = props.heroes;

    return d3.scale.linear()
      .domain([0, props.barWidth])
      .range([0, props.maxWidth]);
  },

  renderHero: function (hero, idx) {
    var xScale = this.getXScale(this.props);
    var url = "http://cdn.dota2.com/apps/dota2/images/heroes/";
    var alliedHero = HeroStore.findByName(hero.hero);

    if (typeof alliedHero !== "undefined") {
      return (
        <li key={idx}>
          <img src={url + alliedHero.image_url + '_lg.png'} height="25px"></img>
          <WinLossBar hero={hero} xScale={xScale} barWidth={this.props.barWidth}/>
          <div className="bar-text">
            <span className="grey">{hero.hero + ': '}</span>
            <span className={parseFloat(hero.winrate) > 50 ? "green" : "red"}>{hero.winrate + '% '}</span>
          </div>
        </li>
      )
    } else {
      return <li key={idx}/>
    }
  },

  renderHeroes: function (heroes) {
    var that = this;
    if (heroes.length == 0) {
      return (
        <Row className="hero-stats-loading">
          <Spinner/>
        </Row>
      )
    } else {
      return (
        <ul className="fade-in">
          {heroes.map(function (hero, idx) {
            return that.renderHero(hero, idx);
          })}
        </ul>
      )
    }
  },

  render: function () {
    return (
      <div className="other-hero-stats fade-in" id={this.props.initial ? "initial-stats" : ""}>
        {this.renderHeroes(this.props.heroes)}
      </div>
    )
  }
});

module.exports = WinratesWithOtherHeroes;
