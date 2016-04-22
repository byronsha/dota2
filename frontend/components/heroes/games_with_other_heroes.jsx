var React = require('react'),
    HeroStore = require('../../stores/hero_store.js'),
    GameCountBar = require('./game_count_bar.jsx');

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
      return (
        <div className="sk-fading-circle">
          <div className="sk-circle1 sk-circle"></div>
          <div className="sk-circle2 sk-circle"></div>
          <div className="sk-circle3 sk-circle"></div>
          <div className="sk-circle4 sk-circle"></div>
          <div className="sk-circle5 sk-circle"></div>
          <div className="sk-circle6 sk-circle"></div>
          <div className="sk-circle7 sk-circle"></div>
          <div className="sk-circle8 sk-circle"></div>
          <div className="sk-circle9 sk-circle"></div>
          <div className="sk-circle10 sk-circle"></div>
          <div className="sk-circle11 sk-circle"></div>
          <div className="sk-circle12 sk-circle"></div>
        </div>
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
    var heroes = this.sortedHeroes();

    return (
      <div className="other-hero-stats" id={this.props.initial ? "initial-stats" : ""}>
        {this.renderHeroes(heroes)}
      </div>
    )
  }
});

module.exports = WinratesWithOtherHeroes;
