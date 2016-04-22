var React = require('react'),
    HeroStore = require('../../stores/hero_store.js'),
    GameCountBar = require('./game_count_bar.jsx'),
    Spinner = require('./spinner.jsx');

var WinratesWithOtherHeroes = React.createClass({
  getXScale: function(props) {
    heroes = props.heroes;

    var xMax = d3.max(heroes, function(hero) { return hero.games });

    return d3.scale.linear()
      .domain([0, xMax])
      .range([0, props.maxWidth]);
  },

  sortedHeroes: function () {
    return this.props.heroes.sort(function(a, b) {
      if (a.games < b.games) {
        return 1;
      } else if (a.games > b.games) {
        return -1;
      } else {
        return 0;
      }
    });
  },

  renderHero: function (hero, idx) {
    var xScale = this.getXScale(this.props);
    var url = "http://cdn.dota2.com/apps/dota2/images/heroes/";
    var alliedHero = HeroStore.findByName(hero.hero);

    if (typeof alliedHero !== "undefined") {
      return (
        <li key={idx}>
          <img src={url + alliedHero.image_url + '_lg.png'}></img>
          <GameCountBar hero={hero} xScale={xScale} barWidth={this.props.barWidth}/>
          <div className="bar-text">
            <span className="grey">{hero.hero + ': '}</span>
            <span className="game-count-text">{hero.games}</span>
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
      return <Spinner/>
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
    var heroes = this.sortedHeroes();

    return (
      <div className="other-hero-stats" id={this.props.initial ? "initial-stats" : ""}>
        {this.renderHeroes(heroes)}
      </div>
    )
  }
});

module.exports = WinratesWithOtherHeroes;
